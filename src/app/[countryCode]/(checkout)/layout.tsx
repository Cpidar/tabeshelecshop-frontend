import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import initTranslations from "@/app/i18n"
import Logo from "@/shared/Logo/Logo"
import { CartProvider } from "@/modules/cart/components/cart-context"
import { retrieveCart } from "@/modules/cart/actions"
import { redirect } from "next/navigation"

export default async function CheckoutLayout({
  params: { countryCode },
  children,
}: {
  params: { countryCode: string }
  children: React.ReactNode
}) {
  const disablePurchasing =
    process.env.NEXT_PUBLIC_DISABLE_PURCHASING === "true"
  if (disablePurchasing) {
    redirect("/")
  }

  const { t } = await initTranslations(countryCode, ["common"])
  const cart = retrieveCart()

  return (
    <CartProvider countryCode={countryCode} cartPromise={cart}>
      <div className="w-full bg-white relative small:min-h-screen">
        <div className="h-16 bg-white border-b ">
          <nav className="flex h-full items-center content-container justify-between">
            <LocalizedClientLink
              href="/cart"
              className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
              data-testid="back-to-cart-link"
            >
              <ChevronDown className="rotate-90" size={16} />
              <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
                بازگشت به سبد خرید
              </span>
              <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
                {t("back")}
              </span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
              data-testid="store-link"
            >
              <Logo />
            </LocalizedClientLink>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative" data-testid="checkout-container">
          {children}
        </div>
        <div className="py-4 w-full flex items-center justify-center">
          <MedusaCTA />
        </div>
      </div>
    </CartProvider>
  )
}
