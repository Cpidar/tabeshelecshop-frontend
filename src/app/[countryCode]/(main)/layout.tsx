import { Metadata } from "next"
// import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
import "rc-slider/assets/index.css"
import Footer from "@/shared/Footer/Footer"
import CommonClient from "./CommonClient"
import HeaderLogged from "@/components/Header/HeaderLogged"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import initTranslations from "@/app/i18n"
import { getCustomer } from "@/lib/data"
import MobileHeader from "@/modules/layout/components/mobile-header"
import MobileNavigation from "@/modules/layout/components/mobile-navigation"
import { CartProvider } from "@/modules/cart/components/cart-context"
import { initializeCart } from "@/modules/cart/actions"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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

  return (
    <CartProvider countryCode={countryCode}>
      <TranslationsProvider
        locale={countryCode}
        namespaces={i18nNamespaces}
        resources={resources}
      >
        <HeaderLogged />
        <MobileHeader />
        {/* <SecondNav2 /> */}
        {children}
        <CommonClient />
        <Footer />
        <MobileNavigation />
      </TranslationsProvider>
    </CartProvider>
  )
}
