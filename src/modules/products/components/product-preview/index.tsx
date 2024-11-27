
import { getProductPrice } from "@lib/util/get-product-price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductCard from "./ProductCard"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
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
  return <ProductCard product={product} region={region} />
}
