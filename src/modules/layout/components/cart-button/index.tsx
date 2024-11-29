import CartDrawer from "@/modules/cart/components/cart-drawer"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { notFound } from "next/navigation"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}


export default async function CartButton() {
  // const cart = await fetchCart()

  return <CartDrawer />
}
