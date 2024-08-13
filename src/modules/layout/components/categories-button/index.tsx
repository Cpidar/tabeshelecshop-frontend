import DropdownCategories from "@/components/Header/DropdownCategories"
// import { LineItem } from "@medusajs/medusa"

// import { enrichLineItems, retrieveCart } from "@modules/cart/actions"

// const fetchCart = async () => {
//     const cart = await retrieveCart()

//     if (cart?.items.length) {
//         const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
//         cart.items = enrichedItems as LineItem[]
//     }

//     return cart
// }


export default async function CategoriesButton() {
    // const cart = await fetchCart()

    return (<DropdownCategories categories={[]} />)
}
