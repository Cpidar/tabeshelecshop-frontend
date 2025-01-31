import { Metadata } from "next"

import CartTemplate from "@modules/cart/templates"

import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"
import { useParams } from "next/navigation"
import { CartProvider } from "@/modules/cart/components/cart-context"

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید خود را مشاهده کنید",
}

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Cart(
  props: {
    params: Promise<{ countryCode: string; handle: string }>
  }
) {
  const params = await props.params;
  const cart = await fetchCart()
  const customer = await getCustomer()

  return (
    <CartProvider countryCode={params.countryCode} cart={cart}>
      <CartTemplate cart={cart} customer={customer} />
    </CartProvider>
  )
}
