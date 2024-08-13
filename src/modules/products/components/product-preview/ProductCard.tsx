import LikeButton from "../like-button/LikeButton"
import Prices from "../product-price/Prices"
import { StarIcon } from "@heroicons/react/24/solid"
import ProductStatus from "../product-status/ProductStatus"
import Link from "next/link"
import NcImage from "@/shared/NcImage/NcImage"
import { ProductPreviewType } from "@/types/global"
import { Region } from "@medusajs/medusa"
import { RenderSizeList } from "./RenderSizeList"
import { RenderGroupButtons } from "./RenderGroupButtons"

import { retrievePricedProductById } from "@lib/data"
import { transformMedusaProduct } from "@/utils/data-mappers"
import PlaceholderImage from "@/images/placeholders/product-placeholder.png"
import { stripHtmlTag } from "@/utils/StripHtmlTag"

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

  // const { cheapestPrice } = getProductPrice({
  //   product: pricedProduct,
  //   region,
  // })

  const data = transformMedusaProduct(pricedProduct, region)

  const {
    name,
    slug,
    sale_price: price,
    description,
    sizes,
    status,
    thumbnail: image,
    rating,
    numberOfReviews,
    variants
  } = data

  const StripOffDesc = stripHtmlTag(description)
  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={`/products/${slug}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/products/${slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image ? image : PlaceholderImage}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductStatus status={status} />
          {/* <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" /> */}
          {sizes ? (
            <RenderSizeList data={data} sizes={sizes} />
          ) : (
            <RenderGroupButtons data={data} />
          )}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* <RenderVariants variants={variants} variantType={variantType} /> */}
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {StripOffDesc}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
