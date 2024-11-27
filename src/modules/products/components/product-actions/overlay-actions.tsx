"use client"

import React, { useState } from "react"
import BagIcon from "@/shared/Icons/BagIcon"
import { useParams } from "next/navigation"
import NcInputNumber from "./NcInputNumber"
import ButtonCircle from "@/shared/Button/ButtonCircle"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@/lib/data/cart"
import { addToCartEventBus } from "@/modules/cart/components/cart-context/event-bus"

// const ModalQuickView = dynamic(() => import("../quick-view-modal/ModalQuickView"))
export const RenderGroupButtons = ({
  selectedVariant,
}: {
  selectedVariant: HttpTypes.StoreProductVariant
}) => {
  const [showModalQuickView, setShowModalQuickView] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  const countryCode = useParams()?.countryCode as string

  const [quantitySelected, setQuantitySelected] = useState(1)

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    addToCartEventBus.emitCartAdd({
      productVariant: selectedVariant,
      quantity: quantitySelected,
      countryCode,
    })

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }
  // const [message, formAction] = useFormState(addToCart, null)
  // const actionWithVariant = formAction.bind({
  //   variantId: variant?.id!,
  //   quantity: quantitySelected,
  //   countryCode,
  // })

  return (
    <>
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="flex items-center justify-around bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
          <NcInputNumber
            max={selectedVariant.inventory_quantity}
            defaultValue={quantitySelected}
            onChange={setQuantitySelected}
          />
          <div className="w-8"></div>
          {/* <form
              action={async () => {
                if (!selectedVariant?.id) return null
                addCartItem(selectedVariant, quantitySelected)
                await actionWithVariant()
              }}
            > */}
          <ButtonCircle onClick={handleAddToCart} className="w-8 h-8">
            <BagIcon className="w-3.5 h-3.5 " />
          </ButtonCircle>
          {/* </form> */}
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
