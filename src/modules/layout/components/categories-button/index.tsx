import DropdownCategories from "@/modules/categories/components/category-dropdown"
import { getCategoryByHandle } from "@/lib/data/categories"


export default async function CategoriesButton() {
    const product_categories = await getCategoryByHandle(['main'])


    return (<DropdownCategories items={product_categories} />)
}
