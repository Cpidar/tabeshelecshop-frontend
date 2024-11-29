import { _getImgRd, _getTagNameRd } from "@/data/fakeData"
import React, { FC } from "react"
import NcImage from "@/components/NcImage/NcImage"
import Link from "next/link"
import { StaticImageData } from "next/image"
import dynamic from "next/dynamic"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export interface CardCategory1Props {
  className?: string
  size?: "large" | "normal"
  featuredImage?: string | StaticImageData
  name?: string
  desc?: string
}


const CardCategory7: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  name = "",
  desc = "",
  featuredImage = "",
}) => {
  return (
    <LocalizedClientLink
      href={"/collection"}
      className={`m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`max-h-20 text-yellow-400`}
        src={featuredImage || _getImgRd()}
        unoptimized
        width={20}
        height={20}
      />
      <span className="font-semibold">{name || _getTagNameRd()}</span>
    </LocalizedClientLink>
  )
}

export default CardCategory7
