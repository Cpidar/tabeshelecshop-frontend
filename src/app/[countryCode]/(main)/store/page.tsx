import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { isArray } from "lodash"

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    category_id: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page, category_id } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      categoryId={isArray(category_id) ? category_id : [category_id]}
      countryCode={params.countryCode}
    />
  )
}
