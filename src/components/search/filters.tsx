import { ProductCategoryWithChildren } from "@/types/global"
import { CategoryFilter } from "./category-filter"
import { FilteredItems } from "./filtered-items"
import { listMainCategories } from "@lib/data"

export const ShopFilters: React.FC = async () => {
  const product_categories = await listMainCategories('main')
  return (
    <div className="space-y-10">
        <FilteredItems items={product_categories} />

      <CategoryFilter product_categories={product_categories} />

    </div>
  )
}
