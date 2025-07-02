
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import ProductCard from "./ProductCard"
import { listProducts, retrieveProductsById } from "@/lib/data/products"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await listProducts({
    queryParams: {id: [product.id!]},
    regionId: region.id,
  }).then(({ response }) => response.products)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })
  return <ProductCard product={product} region={region} />
}
