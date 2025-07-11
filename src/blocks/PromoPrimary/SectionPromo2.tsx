import React, { FC } from "react"
import NcImage from "@/components/NcImage/NcImage"
import rightImgDemo from "@/images/hero-right.png"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import { Logo } from "@/components/Logo/Logo"
import backgroundLineSvg from "@/images/Moon.svg"
import Image from "next/image"
import { PromoBlock } from "@/payload-types"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"

// export interface SectionPromo2Props {
//   className?: string
//   title: string
//   description: string
//   image: Media
//   imageDark: Media
// }

const SectionPromo2: FC<PromoBlock> = ({
  title,
  description,
  image,
  imageDark,
}) => {
  const className = "lg:pt-10"
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Logo className="w-28" />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 leading-[1.13]! tracking-tight">
            {title}
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400">
            {description && (
              <RichText data={description} enableGutter={false} />
            )}
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/search"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              مشاهده کنید
            </ButtonPrimary>
          </div>
        </div>
        {image && typeof image === "object" && (
          // <NcImage
          //   alt={image.alt ?? ""}
          //   containerClassName="relative block lg:absolute ltr:lg:left-0 rtl:lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
          //   src={image.url as string}
          //   sizes="(max-width: 768px) 100vw, 50vw"
          //   className=""
          // />
          <Media
            htmlElement="div"
            className="relative block lg:absolute ltr:lg:left-0 rtl:lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
            // fill
            imgClassName="-z-10 object-cover w-full h-full"
            priority
            resource={image}
            size="(max-width: 768px) 100vw, 50vw"
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
        {imageDark && typeof imageDark === "object" && (
          // <NcImage
          //   alt={imageDark.alt ?? ""}
          //   containerClassName="relative block lg:absolute ltr:lg:left-0 rtl:lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)] hidden dark:block"
          //   src={imageDark.url as string}
          //   sizes="(max-width: 768px) 100vw, 50vw"
          //   className=""
          // />
          <Media
            htmlElement="div"
            className="relative lg:absolute ltr:lg:left-0 rtl:lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)] hidden dark:block"
            // fill
            imgClassName="-z-10 object-cover w-full h-full"
            priority
            resource={imageDark}
            size="(max-width: 768px) 100vw, 50vw"
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
      </div>
    </div>
  )
}

export default SectionPromo2
