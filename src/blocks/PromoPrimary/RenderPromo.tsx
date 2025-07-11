import React, { FC } from "react"
import { Media } from "@/payload-types"
import SectionPromo1 from "./SectionPromo01"
import SectionPromo2 from "./SectionPromo2"
import SectionPromo3 from "./SectionPromo3"
import { json } from "stream/consumers"
import type { PromoBlock } from '@/payload-types'

export interface PromoPrimaryProps {
  promoType: "promo1" | "promo2" | "promo3"
  title: string
  description: string
  image: Media
  imageDark: Media
}

const promoes = {
  promo1: SectionPromo1,
  promo2: SectionPromo2,
  promo3: SectionPromo3,
}

export const RenderPromo: React.FC<PromoBlock> = (props) => {
  const { PromoType } = props || {}

  if (!PromoType) return null

  const PromoToRender = promoes[PromoType]

  if (!PromoToRender) return null

  return <PromoToRender {...props} />
}
