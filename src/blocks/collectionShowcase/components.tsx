import React from "react"
import { getCollectionByHandle } from "@/lib/data/collections"
import ProductCard from "@/modules/products/components/product-preview/ProductCard"
import { getRegion } from "@/lib/data/regions"
import SectionSliderProductCard from "./component.client"

async function Navigation({
  collectionSlug,
  countryCode,
}: {
  collectionSlug: string
  countryCode: string
}) {
  const handle = collectionSlug || "incredible_offer"
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const collection = await getCollectionByHandle(handle)
  return (
    <SectionSliderProductCard heading={collection.title} subHeading="">
      {collection &&
        collection.products?.map((item, index) => (
          <li key={index} className="glide__slide">
            <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
              <ProductCard product={item} region={region} />
              <div className=" absolute left-0 top-[30px] w-[1px] bg-gray-100 xl:top-[54px] xl:w-[2px]  h-[320px]"></div>
            </div>
          </li>
        ))}
    </SectionSliderProductCard>
  )
}

export default Navigation
