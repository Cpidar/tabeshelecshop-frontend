"use client"

import React, { useState } from "react"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import BagIcon from "@/shared/Icons/BagIcon"
import NotifyAddTocart from "../add-to-card-notification/NotifyAddToCart"
import { Product } from "@/data/data"
import { addToCart } from "@/modules/cart/actions"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import NcInputNumber from "../product-actions/NcInputNumber"
import ButtonCircle from "@/shared/Button/ButtonCircle"
import { useCart } from "@/modules/cart/components/cart-context"
import { useFormState } from "react-dom"
import { PricedVariant } from "@medusajs/medusa/dist/types/pricing"

// const ModalQuickView = dynamic(() => import("../quick-view-modal/ModalQuickView"))
export const RenderGroupButtons = ({ variant }: { variant: PricedVariant }) => {
  const [showModalQuickView, setShowModalQuickView] = useState(false)
  const [quantitySelected, setQuantitySelected] = useState(1)
  const { addCartItem } = useCart()

  const countryCode = useParams()?.countryCode as string

  // const handleAddToCart = async () => {
  //   if (!variant?.id) return null
  //   addCartItem(variant, quantitySelected)

  //   // NotifyAddTocart({ quantity: quantitySelected, data })
  //   await addToCart({
  //     variantId: variant.id,
  //     quantity: quantitySelected,
  //     countryCode,
  //   })
  // }
  const [message, formAction] = useFormState(addToCart, null)
  const actionWithVariant = formAction.bind(null, {
    variantId: variant?.id!,
    quantity: quantitySelected,
    countryCode,
  })

  return (
    <>
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <div className="flex items-center justify-around bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              max={variant.inventory_quantity}
              defaultValue={quantitySelected}
              onChange={setQuantitySelected}
            />
            <div className="w-8"></div>
            <form
              action={async () => {
                if (!variant?.id) return null
                addCartItem(variant, quantitySelected)
                await actionWithVariant()
              }}
            >
              <ButtonCircle type="submit" className="w-8 h-8">
                <BagIcon className="w-3.5 h-3.5 " />
              </ButtonCircle>
            </form>
          </div>

        {/* <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">مشاهده سریع</span>
        </ButtonSecondary> */}
      </div>

      {/* QUICKVIEW */}
      {/* <ModalQuickView
        data={data}
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      /> */}
    </>
  )
}
