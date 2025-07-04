
import { Metadata } from "next"
import { notFound } from "next/navigation"

import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"


import initTranslations from "@/app/(frontend)/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"

export const metadata: Metadata = {
  title: "Checkout",
}
const i18nNamespaces = ["common"]

export default async function Checkout(
  props: {
    params: Promise<{ countryCode: string }>
  }
) {
  const params = await props.params;

  const {
    countryCode
  } = params;

  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()


  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
        <Wrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </Wrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </TranslationsProvider>
  )
}
