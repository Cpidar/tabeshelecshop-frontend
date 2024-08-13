import { _getImgRd, _getTagNameRd } from "@/data/fakeData"
import React, { FC } from "react"
import NcImage from "@/shared/NcImage/NcImage"
import Link from "next/link"
import { StaticImageData } from "next/image"

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
    <Link
      href={"/collection"}
      className={`m-3.5 h-52 w-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center duration-300 hover:bg-white hover:shadow-2xl ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`max-h-20`}
        src={featuredImage || _getImgRd()}
      />
      <span className="font-semibold">{name || _getTagNameRd()}</span>
    </Link>
  )
}

export default CardCategory7
