import React, { FC } from "react"
import NcImage from "@/components/NcImage/NcImage"
// import rightImgDemo from "@/images/rightLargeImg.png";
// import rightLargeImgDark from "@/images/rightLargeImgDark.png";
// import ToolsImage from "@/images/tools-img-construction.webp";
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import { Logo } from "@/components/Logo/Logo"
import ButtonSecondary from "@/components/Button/ButtonSecondary"
import { PromoBlock } from "@/payload-types"
import RichText from "@/components/RichText"
import { Media } from "@/components/Media"

export interface SectionPromo1Props {
  title: string
  description: string
  image: string
  imageDark: string
}

const SectionPromo1: FC<PromoBlock> = ({
  title = "",
  description,
  image,
  imageDark,
}) => {
  return (
    <div
      className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center`}
    >
      <div className="relative shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-3/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl mt-6 sm:mt-10 leading-[1.2]! tracking-tight text-foreground">
          {title}
        </h2>
        <span className="block mt-6 text-muted-foreground">
          {description && <RichText data={description} enableGutter={false} />}
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary href="/collection" className="">
            خرید کنید
          </ButtonPrimary>
          <ButtonSecondary
            href="/search"
            className="border border-border"
          >
            در موردشان بخوانید
          </ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        {/* Show imageDark if data-theme=dark, otherwise show image. Use CSS to toggle visibility. */}
        {image && typeof image === "object" && (
          <Media
            htmlElement="div"
            className="block [data-theme=dark]:hidden"
            imgClassName="-z-10 object-cover w-full h-full"
            priority
            resource={image}
            size="(max-width: 768px) 100vw, 50vw"
            videoClassName="-z-10 object-cover absolute h-full w-full object-cover top-0 left-0"
          />
        )}
        {imageDark && typeof imageDark === "object" && (
          <Media
            htmlElement="div"
            className="hidden [data-theme=dark]:block"
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

export default SectionPromo1
