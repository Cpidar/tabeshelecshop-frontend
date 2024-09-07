"use client"

import React, { FC, ReactNode, useState } from "react"
import useInterval from "react-use/lib/useInterval"
import useBoolean from "react-use/lib/useBoolean"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import rightImg from "@/images/about-hero-right.png"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Image, { StaticImageData } from "next/image"
import imageRightPng from "@/images/hero-right.png"
import { HERO2_DEMO_DATA as DATA } from "@/data/data"
import { HERO1_DEMO_DATA } from "@/data/data"
import Link from "next/link"

export interface SectionHeroProps {
  title: ReactNode
  subtitle: string
  buttonText: string
  buttonLink: string
  image: StaticImageData | string
}

let TIME_OUT: NodeJS.Timeout | null = null

const SectionHero: FC<{
  className?: string
  sliderHero: SectionHeroProps[]
  rightHero: SectionHeroProps
}> = ({ className, sliderHero, rightHero }) => {
  // =================
  const [indexActive, setIndexActive] = useState(0)
  const [isRunning, toggleIsRunning] = useBoolean(true)

  useInterval(
    () => {
      handleAutoNext()
    },
    isRunning ? 5500 : null
  )
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= sliderHero.length - 1) {
        return 0
      }
      return state + 1
    })
  }

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= sliderHero.length - 1) {
        return 0
      }
      return state + 1
    })
    handleAfterClick()
  }

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return sliderHero.length - 1
      }
      return state - 1
    })
    handleAfterClick()
  }

  const handleAfterClick = () => {
    toggleIsRunning(false)
    if (TIME_OUT) {
      clearTimeout(TIME_OUT)
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true)
    }, 1000)
  }
  // =================
  const renderItem = (index: number) => {
    const isActive = indexActive === index
    const item = sliderHero[index]
    if (!isActive) {
      return null
    }
    return (
      <section className="bg-gray-100 bg-opacity-90 py-10" key={index}>
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          {/* left */}
          <div
            className={`nc-SectionHero2Item nc-SectionHero2Item--animation lg:w-2/3 flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
          >
            <div
              className="relative rounded-xl bg-secondary-lite bg-cover p-8 md:p-16 nc-SectionHero2Item__left"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <p className="max-w-sm text-secondary text-3xl md:text-4xl font-semibold nc-SectionHero2Item__heading">
                {item.title}
              </p>
              <p className="max-w-xs ltr:pr-10 rtl:pl-10 text-secondary font-semibold mt-8 nc-SectionHero2Item__subheading">
                {item.subtitle}
              </p>
              <Link href={item.buttonLink}>
                <button className="mt-20 bg-white font-semibold px-8 py-2 rounded nc-SectionHero2Item__button">
                  {item.buttonText}
                </button>
              </Link>
              <div className="absolute bottom-8 ltr:right-8 rtl:left-8 md:bottom-5 ltr:md:right-5 rtl:md:left-5 flex">
                <button
                  onClick={handleClickPrev}
                  className="h-6 w-6 flex items-center justify-center rounded-md bg-white"
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
                </button>
                <button
                  onClick={handleClickNext}
                  className="mr-1.5 h-6 w-6 flex items-center justify-center rounded-md bg-yellow-400"
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
                </button>
              </div>
              {/* <div className="hidden mt-10 lg:mt-0 lg:absolute end-0 rtl:-end-28 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-contain object-right-bottom nc-SectionHero2Item__image"
                  src={imageRightPng}
                  alt={""}
                  priority
                />
              </div> */}
            </div>
          </div>
          {/* right */}
          <div
            className="mt-6 lg:mt-0 ltr:lg:ml-6 rtl:lg:mr-6 lg:w-1/3 rounded-xl bg-primary-lite bg-cover p-8 md:p-16"
            style={{ backgroundImage: `url(${rightHero.image})` }}
          >
            <div className="max-w-sm">
              <p className="text-3xl md:text-4xl font-semibold uppercase">
                {rightHero.title}
              </p>
              <p className="mt-8 font-semibold">
                {rightHero.subtitle}
                {/* <br />
                2.0 OZ */}
              </p>
              <Link href={rightHero.buttonLink}>
                <button className="mt-20 bg-white font-semibold px-8 py-2 rounded">
                  {rightHero.buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return <>{sliderHero.map((_, index) => renderItem(index))}</>
}

export default SectionHero
