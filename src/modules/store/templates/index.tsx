import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"

import PaginatedProducts from "./paginated-products"
import SectionSliderCollections from "@/components/SectionSliderLargeProduct"
import SectionPromo1 from "@modules/home/components/SectionPromo1"
import SidebarFilters from "@/components/SidebarFilters"
export type SortOptions = "price_asc" | "price_desc" | "created_at"
import { ShopFilters } from "@/components/search/filters"
import CategoryList from "../components/refinement-list/category-list"
const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  categoryId,
}: {
  sortBy?: SortOptions
  categoryId: string[]
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  return (
    <div className={`nc-PageCollection2`}>
      <div className="py-16 lg:pb-28 lg:pt-20 mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div className="space-y-10 lg:space-y-14">
          {/* <hr className="border-slate-200 dark:border-slate-700" /> */}
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block top-16 lg:w-1/3 xl:w-1/4 pr-4">
                <RefinementList sortBy={sort} />
                {/* <CategoryList /> */}
                {/* <ShopFilters /> */}
                {/* <SidebarFilters /> */}
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <Suspense fallback={<SkeletonProductGrid />}>
                  <PaginatedProducts
                    sortBy={sort}
                    page={pageNumber}
                    countryCode={countryCode}
                    categoryId={categoryId}
                  />
                </Suspense>
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        {/* <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections /> */}
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  )
}

export default StoreTemplate
