"use client"

import React from "react"
import Prices from "../product-price/Prices"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/data/data"
import PlaceholderImage from "@/images/placeholders/product-placeholder.png"

export const RenderProductCartOnNotify = ({
  data,
  size,
  quantity,
  variantActive = 0,
}: {
  size?: string
  quantity: number
  data: Product
  variantActive?: number 
}) => {
  const {
    name,
    sale_price: price,
    variants,
    thumbnail: image,
  } = data

  const router = useRouter()

  return (
    <div className="flex ">
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          width={80}
          height={96}
          src={image ? image : PlaceholderImage}
          alt={name}
          className="absolute object-cover object-center"
        />
      </div>

      <div className="ms-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="text-base font-medium ">{name}</h3>
              {/* <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span>
                  {variants ? variants[variantActive].name : `Natural`}
                </span>
                <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                <span>{size || "XL"}</span>
              </p> */}
            </div>
            <Prices price={price} className="mt-0.5" />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 dark:text-slate-400">تعداد {quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary-6000 dark:text-primary-500 "
              onClick={(e) => {
                e.preventDefault()
                router.push("/cart")
              }}
            >
              مشاهده سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
