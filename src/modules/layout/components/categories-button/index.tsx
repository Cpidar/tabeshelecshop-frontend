import DropdownCategories from "@/components/Header/DropdownCategories"
import { listMainCategories } from "@/lib/data"


export default async function CategoriesButton() {
    const product_categories = await listMainCategories('main')


    return (<DropdownCategories items={product_categories} />)
}
