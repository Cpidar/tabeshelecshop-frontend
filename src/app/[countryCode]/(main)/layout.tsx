import { Metadata } from "next"
// import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
import "rc-slider/assets/index.css"
import Footer from "@/shared/Footer/Footer"
import CommonClient from "./CommonClient"
import HeaderLogged from "@/components/Header/HeaderLogged"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import initTranslations from "@/app/i18n"
import MobileHeader from "@/modules/layout/components/mobile-header"
import MobileNavigation from "@/modules/layout/components/mobile-navigation"
import { CartProvider } from "@/modules/cart/components/cart-context"
import { getBaseURL } from "@lib/util/env"
import { getOrSetCart, retrieveCart } from "@/lib/data/cart"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout({
  params: { countryCode },
  children,
}: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const i18nNamespaces = ["common"]

  const { t, resources } = await initTranslations(countryCode, ["common"])
  let cart = await retrieveCart()

  // if (!cart) {
  //   cart = await getOrSetCart(countryCode)
  // }

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <HeaderLogged countryCode={countryCode} />
      <MobileHeader />
      {/* <SecondNav2 /> */}
      {children}
      <CommonClient />
      <Footer />
      <MobileNavigation cart={cart!} />
    </TranslationsProvider>
  )
}
