
import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { getCart } from "@lib/data"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"

export const metadata: Metadata = {
  title: "Checkout",
}
const i18nNamespaces = ["common"]

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value
  console.log(cartId)

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Checkout({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
        <Wrapper cart={cart}>
          <CheckoutForm />
        </Wrapper>
        <CheckoutSummary />
      </div>
    </TranslationsProvider>
  )
}
