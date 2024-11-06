import LikeButton from "../like-button/LikeButton"
import Prices from "../product-price/Prices"
import { StarIcon } from "@heroicons/react/24/solid"
import ProductStatus from "../product-status"
import Link from "next/link"
import NcImage from "@/shared/NcImage/NcImage"
import { ProductPreviewType } from "@/types/global"
import { Region } from "@medusajs/medusa"
import { RenderSizeList } from "./RenderSizeList"
import { RenderGroupButtons } from "../overlay-actions"

import { retrievePricedProductById } from "@lib/data"
import { transformMedusaProduct } from "@/utils/data-mappers"
import PlaceholderImage from "@/images/placeholders/product-placeholder.png"
import { stripHtmlTag } from "@/utils/StripHtmlTag"
import InCardProductPrice from "../product-price/inCard"
import { getProductPrice } from "@/lib/util/get-product-price"

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
    <>
      <div
        className={`nc-ProductCard relative flex flex-col rounded-[10px] bg-white pt-[52px] border shadow-[0px_1px_4px_rgba(0,0,0,0.08)] ${className}`}
      >
        {cheapestPrice?.calculated_price_list?.type === "sale" &&
          cheapestPrice?.calculated_price_list?.status === "active" && (
            <ProductStatus
              title={cheapestPrice?.calculated_price_list?.name!}
              endAt={cheapestPrice?.calculated_price_list?.ends_at}
            />
          )}
        <div className="relative mb-[22px] flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/products/${slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image ? image : PlaceholderImage}
              className="object-fit w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
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
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {title}
            </h2>
            <p
              className={`hidden lg:block text-sm text-slate-500 dark:text-slate-400 mt-1 `}
            >
              {StripOffDesc}
            </p>
          </div>

          <InCardProductPrice product={pricedProduct} region={region} />
        </div>
      </div>
    </>
  )
}

export default ProductCard
