"use client"

import React from "react"
import toast from "react-hot-toast"
import { Transition } from "@/app/(frontend)/headlessui"
import { RenderProductCartOnNotify } from "../product-preview/RenderProductCartOnNotify"

const NotifyAddTocart = ({
  data,
  size,
  quantity,
}: {
  data: any
  quantity: number
  size?: string
}) => {
  toast.custom(
    (t) => (
      <Transition
        appear
        show={t.visible}
        as="div"
        className="p-4 max-w-md w-full bg-background shadow-lg rounded-2xl pointer-events-auto ring-1 ring-border text-foreground"
        enter="transition-all duration-150"
        enterFrom="opacity-0 translate-x-20"
        enterTo="opacity-100 translate-x-0"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-20"
      >
        <p className="block text-base font-semibold leading-none">
          به سبد خرید اضافه شد!
        </p>
        <div className="border-t border-border my-4" />
        <RenderProductCartOnNotify quantity={quantity} data={data} />
      </Transition>
    ),
    {
      position: "top-left",
      id: "product-detail",
      duration: 3000,
    }
  )
}

export default NotifyAddTocart
