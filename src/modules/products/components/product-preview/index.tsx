import { ProductPreviewType } from "types/global"

import { Region } from "@medusajs/medusa"
import ProductCard from "./ProductCard"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  return <ProductCard productPreview={productPreview} region={region} />
}
