import { Metadata } from "next"
// import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
import "rc-slider/assets/index.css"
import { Footer } from "@/modules/footer/Component"
import CommonClient from "./CommonClient"
import HeaderLogged from "@/modules/header"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import initTranslations from "@/app/i18n"
import { getBaseURL } from "@lib/util/env"
import { listCartOptions, retrieveCart } from "@/lib/data/cart"
import CartMismatchBanner from "@/modules/cart/components/cart-mismatch-banner"
import { StoreCartShippingOption } from "@medusajs/types"
import { retrieveCustomer } from "@/lib/data/customer"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()
  let cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  const { countryCode } = params

  const { children } = props

  const i18nNamespaces = ["common"]

  const { t, resources } = await initTranslations(countryCode, ["common"])

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <HeaderLogged countryCode={countryCode} />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {/* <SecondNav2 /> */}
      {children}
      <CommonClient />
      <Footer cart={cart!} />
    </TranslationsProvider>
  )
}
