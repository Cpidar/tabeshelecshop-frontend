import ProductStatus from "../product-status"
import NcImage from "@/shared/NcImage/NcImage"

import PlaceholderImage from "@/images/placeholders/product-placeholder.png"
import { stripHtmlTag } from "@/utils/StripHtmlTag"
import InCardProductPrice from "../product-price/inCard"
import { getProductPrice } from "@/lib/util/get-product-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getProductsById } from "@/lib/data/products"
import { RenderGroupButtons } from "../product-actions/overlay-actions"

export interface ProductCardProps {
  className?: string
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isLiked?: boolean
}

const ProductCard = async ({
  className = "",
  product,
  region,
  isLiked,
}: ProductCardProps) => {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  // const { cheapestPrice } = getProductPrice({
  //   product: pricedProduct,
  //   region,
  // })

  const { title, handle: slug, description, thumbnail: image } = pricedProduct

  const StripOffDesc = description && stripHtmlTag(description)
  return (
    <div className="relative lg:flex lg:justify-center lg:pl-[10px]">
      <div
        className={`flex flex-col items-center  w-full min-w-[148px] lg:w-[200px] xl:w-[186px] ${className}`}
      >
        {cheapestPrice?.price_type === "sale" &&
          cheapestPrice.is_calculated_price_price_list && (
            <ProductStatus
              id={cheapestPrice.price_list_id}
            />
          )}
        <div className="relative w-[132px] lg:w-[186px]">
          <LocalizedClientLink
            href={`/products/${slug}`}
            className="w-full relative group-hover:opacity-75"
          >
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-full"
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
          {pricedProduct?.variants?.length === 1 && (
            <RenderGroupButtons selectedVariant={pricedProduct?.variants[0]} />
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

          <InCardProductPrice product={pricedProduct} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
