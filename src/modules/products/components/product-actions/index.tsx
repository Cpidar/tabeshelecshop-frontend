"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"
import NcInputNumber from "./NcInputNumber"
import BagIcon from "@/shared/Icons/BagIcon"
import { useCart } from "@/modules/cart/components/cart-context"
import { useFormState } from "react-dom"
import { Bounce, toast } from "react-toastify"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
  disabled?: boolean
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantitySelected, setQualitySelected] = useState(1)
  const { cart, addCartItem } = useCart()

  const countryCode = useParams().countryCode as string

  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return {
      ...variants.find((v) => v.id === variantId),
      thumbnail: product.thumbnail,
      product: { title: product.title },
    }
  }, [options, variantRecord, variants, product])

  const optimisticItem = useMemo(
    () => cart?.items.find((item) => item.variant_id === variant?.id),
    [cart, variant]
  )

  const inCartQuantity = optimisticItem?.quantity || 0
  const inStockQty = variant?.inventory_quantity || Infinity

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true
    }

    // // If there is inventory available, we can add to cart
    // if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
    //   return true
    // }

    if (inStockQty > inCartQuantity) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [variant, inStockQty, inCartQuantity])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null

    addCartItem(variant, quantitySelected)

    setIsAdding(true)

    await addToCart(null, {
      variantId: variant.id,
      quantity: quantitySelected,
      countryCode,
    })

    setIsAdding(false)
  }

  const [message, formAction] = useFormState(addToCart, null)
  const actionWithVariant = formAction.bind(null, {
    variantId: variant?.id!,
    quantity: quantitySelected,
    countryCode,
  })

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={updateOptions}
                      title={option.title}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={variant} region={region} />
        <form
          action={async () => {
            if (!variant?.id) return null

            addCartItem(variant, quantitySelected)
            await actionWithVariant()
          }}
        >
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                className="w-full"
                max={inStockQty}
                defaultValue={quantitySelected}
                onChange={setQualitySelected}
              />
            </div>
            <span className="w-1"></span>

            <Button
              type="submit"
              disabled={!inStock || !variant || !!disabled || isAdding}
              variant="primary"
              className="flex-1 flex-shrink-0 rounded-full"
              isLoading={isAdding}
              data-testid="add-product-button"
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">
                {!variant
                  ? "یک گزینه را انتخاب کنید"
                  : !inStock
                  ? "اتمام موجودی"
                  : "اضافه به سبد خرید"}
              </span>
            </Button>
          </div>
          <MobileActions
            product={product}
            variant={variant}
            region={region}
            options={options}
            updateOptions={updateOptions}
            inStock={inStock}
            handleAddToCart={handleAddToCart}
            isAdding={isAdding}
            show={!inView}
            optionsDisabled={!!disabled || isAdding}
            inStockQty={inStockQty}
            quantitySelected={quantitySelected}
            setQualitySelected={setQualitySelected}
          />
        </form>
      </div>
    </>
  )
}
