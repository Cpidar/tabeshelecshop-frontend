import { Metadata } from "next"
import { notFound } from "next/navigation"

import CartTemplate from "@modules/cart/templates"

import { retrieveCart } from "@lib/data/cart"
import { CartProvider } from "@/modules/cart/components/cart-context"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید خود را مشاهده کنید",
}


export default async function Cart(
  props: {
    params: Promise<{ countryCode: string; handle: string }>
  }
) {
  const params = await props.params;
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()

  return (
    <CartProvider countryCode={params.countryCode} cart={cart}>
      <CartTemplate cart={cart} customer={customer} />
    </CartProvider>
  )
}
