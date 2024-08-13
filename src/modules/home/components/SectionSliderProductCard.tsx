"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import Heading from "@/components/Heading/Heading"
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm"
import { ProductCollectionWithPreviews } from "@/types/global"
import { Region } from "@medusajs/medusa"

export interface SectionSliderProductCardProps {
  className?: string
  itemClassName?: string
  heading?: string
  headingFontClassName?: string
  headingClassName?: string
  subHeading?: string
  children: React.ReactNode
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "",
  children,
}) => {
  const sliderRef = useRef(null)
  // const { products } = collection

  // const data = products.filter((_, i) => i < 8 && i > 2)
  //
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
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
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">{children}</ul>
        </div>
      </div>
    </div>
  )
}

export default SectionSliderProductCard
