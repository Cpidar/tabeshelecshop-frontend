"use client"

import { Media } from "@/payload-types"
import Image from "next/image"
import clsx from "clsx"
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm"
import React, { useRef, useState, useEffect } from "react"

interface LogoCarouselBlockProps {
  title?: string
  alignTitle: "left" | "center" | "right"
  images: Media[]
  pauseOnHover: boolean
  duration: number
}

const LogoCarouselBlock: React.FC<LogoCarouselBlockProps> = ({
  title,
  alignTitle,
  images,
  pauseOnHover = true,
  duration = 40,
}) => {
  const sliderRef = useRef(null)
  // const { products } = collection

  // const data = products.filter((_, i) => i < 8 && i > 2)
  //
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 6,
      gap: 32,
      bound: true,
      direction: "rtl",
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
    <div>
      {title && (
        <div
          className={clsx(
            "container flex",
            alignTitle === "left"
              ? "justify-start"
              : alignTitle === "center"
              ? "justify-center"
              : "justify-end"
          )}
        >
          <div className="prose dark:prose-invert mb-8">
            <h2>{title}</h2>
          </div>
        </div>
      )}

      <div id="logo-carousel" className="glide" ref={sliderRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {images.map((image, index) => (
              <div key={index} className="glide__slide">
                <div id="slide">
                  <div id="slide-image-container">
                    <Image
                      src={image.url as string}
                      alt={`Slide ${index}`}
                      width={300}
                      height={200}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LogoCarouselBlock
