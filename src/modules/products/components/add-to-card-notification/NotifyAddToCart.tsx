"use client"

import React from "react"
import toast from "react-hot-toast"
import { Transition } from "@/app/headlessui"
import { RenderProductCartOnNotify } from "../product-preview/RenderProductCartOnNotify"
import { Product } from "@/data/data"

const NotifyAddTocart = ({
  data,
  size,
  quantity,
}: {
  data: Product
  quantity: number
  size?: string
}) => {
  toast.custom(
    (t) => (
      <Transition
        appear
        show={t.visible}
        className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
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
        <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
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
