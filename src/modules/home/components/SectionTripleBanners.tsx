import React, { FC } from "react"
import NcImage from "@/shared/NcImage/NcImage"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import CardCategory3 from "@/components/CardCategories/CardCategory3"

export interface SectionPromo1Data {
  title: string
  subtitle: string
  buttonText: string
  href: string
  color: string
  image: string
}

export interface SectionPromo1Props {
  className?: string
  data: SectionPromo1Data[]
}

const SectionTripleBanners: FC<SectionPromo1Props> = ({
  className = "",
  data,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {data.map((d, i) => (
        <CardCategory3
          key={i}
          color={d.color}
          name={d.title}
          desc={d.subtitle}
          featuredImage={d.image}
          buttonText={d.buttonText}
          href={d.href}
        />
      ))}
    </div>
  )
}

export default SectionTripleBanners
