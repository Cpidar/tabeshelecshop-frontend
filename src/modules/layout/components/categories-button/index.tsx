import DropdownCategories from "@/components/Header/DropdownCategories"
import { getCategoryByHandle } from "@/lib/data/categories"


export default async function CategoriesButton() {
    const product_categories = await getCategoryByHandle(['main'])


    return (<DropdownCategories items={product_categories} />)
}
