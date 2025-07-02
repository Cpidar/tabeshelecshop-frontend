import { useParams } from "next/navigation"
import React from "react"
import SectionIncredibleOffer from "./component.client"
import { getCollectionByHandle } from "@/lib/data/collections"
import ProductCard from "@/modules/products/components/product-preview/ProductCard"
import { getRegion } from "@/lib/data/regions"

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

  const incredibleOffers = await getCollectionByHandle(handle)
  return (
    <SectionIncredibleOffer heading={incredibleOffers?.title}>
      {incredibleOffers &&
        incredibleOffers?.products?.map((item, index) => (
          <li key={index} className="glide__slide">
            <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
              <ProductCard product={item} region={region} />
              <div className=" absolute left-0 top-[30px] w-[1px] bg-gray-100 xl:top-[54px] xl:w-[2px]  h-[320px]"></div>
            </div>
          </li>
        ))}
    </SectionIncredibleOffer>
  )
}

export default Navigation
