import ProductDetailLoader from "@/components/loaders/product-details-loader"
import ScrollToTop from "@/shared/utils/scrollToTop"

export default function Loading() {
  return (
    <>
      <ScrollToTop />
      <ProductDetailLoader className="w-full" />
    </>
  )
}
