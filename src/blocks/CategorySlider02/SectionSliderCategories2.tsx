"use client"

import React, { FC, useEffect, useRef, useState } from "react"
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm"
import department1Png from "@/images/collections/department1.png"
import department2Png from "@/images/collections/department2.png"
import department3Png from "@/images/collections/department3.png"
import department4Png from "@/images/collections/department4.png"
import { StaticImageData } from "next/image"

export interface CardCategoryData {
  name: string
  desc: string
  img: string | StaticImageData
  color?: string
}
const CATS: CardCategoryData[] = [
  {
    name: "Travel Kits",
    desc: "20+ categories",
    img: department1Png,
    color: "bg-indigo-100",
  },
  {
    name: "Beauty Products",
    desc: "10+ categories",
    img: department2Png,
    color: "bg-slate-100",
  },
  {
    name: "Sport Kits",
    desc: "34+ categories",
    img: department3Png,
    color: "bg-sky-100",
  },
  {
    name: "Pets Food",
    desc: "12+ categories",
    img: department4Png,
    color: "bg-orange-100",
  },
]
export interface SectionSliderCategoriesProps {
  className?: string
  itemClassName?: string
  heading?: string
  subHeading?: string
  data?: CardCategoryData[]
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  heading = "Shop by department",
  subHeading = "",
  className = "",
  itemClassName = "",
  data = CATS,
}) => {
  const sliderRef = useRef(null)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: false,
      direction: "rtl",
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    }

    if (!sliderRef.current) return

    let slider = new Glide(sliderRef.current, OPTIONS)
    slider.mount()
    setIsShow(true)
    return () => {
      slider.destroy()
    }
  }, [sliderRef])

  return (
    <section className={`nc-SectionSliderCategories ${className}`}>
      <div className="relative flex items-end font-bold">
        <h2 className="text-2xl">Browse by Category</h2>
        <a href="" className="ml-10 flex items-center text-gray-400">
          <span className="text-sm">All Categories</span>
          <svg
            className="ml-3 h-3.5"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="chevron-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path
              fill="currentColor"
              d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
            />
          </svg>
        </a>
        <div className="ml-auto flex">
          <a
            href=""
            className="h-6 w-6 flex items-center justify-center rounded-md bg-gray-100"
          >
            <svg
              className="h-3 text-gray-700"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="chevron-left"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z"
              />
            </svg>
          </a>
          <a
            href=""
            className="ml-1.5 h-6 w-6 flex items-center justify-center rounded-md bg-yellow-400"
          >
            <svg
              className="h-3 text-gray-700"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="chevron-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
              />
            </svg>
          </a>
        </div>
      </div>
      {/* cards */}
      <div className="mt-10">
        <ul className="-m-3.5 flex">
          <li className="m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl">
            <img
              className="max-h-20"
              src="https://i.ibb.co/Smq7sZK/2021-11-07-13h26-50.png"
              alt=""
            />
            <span className="font-semibold">Fruits &amp; Vegetables</span>
          </li>
          <li className="m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl">
            <img
              className="max-h-20"
              src="https://i.ibb.co/PwYJkQs/2021-11-07-13h39-41.png"
              alt=""
            />
            <span className="font-semibold">Breads &amp; Sweets</span>
          </li>
          <li className="m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl">
            <img
              className="max-h-20"
              src="https://i.ibb.co/Hx3vbFx/2021-11-07-13h39-52.png"
              alt=""
            />
            <span className="font-semibold">Frozen Seafoods</span>
          </li>
          <li className="m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl">
            <img
              className="max-h-20"
              src="https://i.ibb.co/4PCjhsS/2021-11-07-13h40-02.png"
              alt=""
            />
            <span className="font-semibold">Raw Meats</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default SectionSliderCategories
