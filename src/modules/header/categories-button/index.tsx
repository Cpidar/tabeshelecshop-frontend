import DropdownCategories from "@/modules/categories/components/category-dropdown"
import { getCategoryByHandle, listCategories } from "@/lib/data/categories"


export default async function CategoriesButton() {
    const product_categories = await listCategories()
    return (<DropdownCategories items={product_categories} />)
}
