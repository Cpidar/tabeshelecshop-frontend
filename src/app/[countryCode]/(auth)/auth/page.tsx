import { Metadata } from "next"

import LoginTemplate from "@/modules/account/templates/login-template"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

const i18nNamespaces = ["common"]

export default async function Login({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <LoginTemplate />
    </TranslationsProvider>
  )
}
