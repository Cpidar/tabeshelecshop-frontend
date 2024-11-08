import LikeButton from "../like-button/LikeButton"
import Prices from "../product-price/Prices"
import { StarIcon } from "@heroicons/react/24/solid"
import ProductStatus from "../product-status"
import Link from "next/link"
import NcImage from "@/shared/NcImage/NcImage"
import { ProductPreviewType } from "@/types/global"
import { PriceListStatus, PriceListType, Region } from "@medusajs/medusa"
import { RenderSizeList } from "./RenderSizeList"
import { RenderGroupButtons } from "../overlay-actions"

import { retrievePricedProductById } from "@lib/data"
import { transformMedusaProduct } from "@/utils/data-mappers"
import PlaceholderImage from "@/images/placeholders/product-placeholder.png"
import { stripHtmlTag } from "@/utils/StripHtmlTag"
import InCardProductPrice from "../product-price/inCard"
import { getProductPrice } from "@/lib/util/get-product-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export interface ProductCardProps {
  className?: string
  productPreview: ProductPreviewType
  region: Region
  isLiked?: boolean
}

const ProductCard = async ({
  className = "",
  productPreview,
  region,
  isLiked,
}: ProductCardProps) => {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview?.id,
    regionId: region?.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice, variantPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  // const { cheapestPrice } = getProductPrice({
  //   product: pricedProduct,
  //   region,
  // })

  const data = transformMedusaProduct(pricedProduct, region)

  const { title, handle: slug, description, thumbnail: image } = pricedProduct
  const selectedVariant = {
    thumbnail: image,
    product: { title },
    ...pricedProduct.variants[0],
  }

  const StripOffDesc = description && stripHtmlTag(description)
  return (
    <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
      <div
        className={`flex flex-col items-center  w-full min-w-[148px] lg:w-[200px] xl:w-[186px] ${className}`}
      >
        {cheapestPrice?.calculated_price_list?.type === "sale" &&
          cheapestPrice?.calculated_price_list?.status === "active" && (

            <ProductStatus
              title={cheapestPrice?.calculated_price_list?.name!}
              endAt={cheapestPrice?.calculated_price_list?.ends_at}
            />
          )}
        <div className="relative w-[132px] lg:w-[186px]">
          <LocalizedClientLink href={`/products/${slug}`} className="w-full relative group-hover:opacity-75">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image ? image : PlaceholderImage}
              className="object-fit w-full h-full"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </LocalizedClientLink>
          {/* <ProductStatus status={status} /> */}
          {/* <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" /> */}
          {/* {sizes ? (
            <RenderSizeList data={data} sizes={sizes} />
          ) : ( */}
          {pricedProduct.variants.length === 1 && (
            <RenderGroupButtons variant={selectedVariant} />
          )}
          {/* )} */}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* <RenderVariants variants={variants} variantType={variantType} /> */}
          <div>
            <h2 className="nc-ProductCard__title text-sm transition-colors">
              {title}
            </h2>
            {/* <p
              className={`hidden lg:block text-xs text-slate-500 dark:text-slate-400 mt-1 `}
            >
              {StripOffDesc}
            </p> */}
          </div>

          <InCardProductPrice product={pricedProduct} region={region} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
