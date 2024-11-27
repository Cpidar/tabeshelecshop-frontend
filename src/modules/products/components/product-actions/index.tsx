"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import NcInputNumber from "./NcInputNumber"
import BagIcon from "@/shared/Icons/BagIcon"
import { HttpTypes } from "@medusajs/types"
import { addToCartEventBus } from "@/modules/cart/components/cart-context/event-bus"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantitySelected, setQualitySelected] = useState(1)

  const countryCode = useParams()?.countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])


  // const optimisticItem = useMemo(
  //   () => cart?.items?.find((item) => item.variant_id === selectedVariant?.id),
  //   [cart, selectedVariant]
  // )

  // const inCartQuantity = optimisticItem?.quantity || 0
  const inStockQty = selectedVariant?.inventory_quantity || Infinity

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    addToCartEventBus.emitCartAdd({
      productVariant: selectedVariant,
      quantity: quantitySelected,
      countryCode,
    })

    setIsAdding(false)
  }

  // const [message, formAction] = useActionState(addToCart, null)
  // const actionWithVariant = formAction.bind({
  //   variantId: selectedVariant?.id!,
  //   quantity: quantitySelected,
  //   countryCode,
  // })

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
        {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
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

        <ProductPrice product={product} variant={selectedVariant} />
        {/* <form
          action={async () => {
            if (!selectedVariant?.id) return null

            addCartItem(selectedVariant, quantitySelected)
            await actionWithVariant()
          }}
        > */}
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
              onClick={handleAddToCart}
              disabled={!inStock || !selectedVariant || !!disabled || isAdding}
              variant="primary"
              className="flex-1 flex-shrink-0 rounded-full"
              isLoading={isAdding}
              data-testid="add-product-button"
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">
              {!selectedVariant
                  ? "یک گزینه را انتخاب کنید"
                  : !inStock
                  ? "اتمام موجودی"
                  : "اضافه به سبد خرید"}
              </span>
            </Button>
          </div>
          <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
        {/* </form> */}
      </div>
    </>
  )
}
