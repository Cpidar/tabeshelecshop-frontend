import { getCategoryByHandle, listCategories } from "@/lib/data/categories"
import { CategoryFilter } from "./category-filter"
import { FilteredItems } from "./filtered-items"

export const ShopFilters: React.FC = async () => {
  const product_categories = await getCategoryByHandle(['main'])
  return (
    <div className="space-y-10">
        <FilteredItems items={product_categories} />

      <CategoryFilter product_categories={product_categories} />

    </div>
  )
}
