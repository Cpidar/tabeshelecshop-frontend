import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { isArray } from "lodash"
import Link from "next/link"
import LoadMore from "../components/load-more"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string | string[]
  id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string | string[]
  productsIds?: string[]
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = isArray(categoryId) ? categoryId : [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const {
    response: { products, count },
    nextPage,
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="-mx-px grid grid-cols-2 border-l border-t border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li
              key={p.id}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <ProductPreview productPreview={p} region={region} />
            </li>
          )
        })}
      </ul>
      {/* {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )} */}
      <LoadMore hasNextPage={Boolean(nextPage)} loading={false} page={page} />
    </>
  )
}
