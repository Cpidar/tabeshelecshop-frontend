import ProductDetailLoader from "@/components/loaders/product-details-loader"
import ScrollToTop from "@/components/utils/scrollToTop"

export default function Loading() {
  return (
    <>
      <ScrollToTop />
      <ProductDetailLoader className="w-full" />
    </>
  )
}
