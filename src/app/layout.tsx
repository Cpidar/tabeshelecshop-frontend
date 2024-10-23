import "@/styles/globals.css"
import "@/styles/index.scss"
// import "rc-slider/assets/index.css"
import { Metadata } from "next"
import HolyLoader from "holy-loader"
import { IRANSans } from "@/styles/font"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../keystatic.config"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env

const reader = createReader(process.cwd(), keystaticConfig)

export async function generateMetadata(): Promise<Metadata> {
  const settings = await reader.singletons.settings.read()

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: settings?.SEO.siteName!,
      template: `%s | ${settings?.SEO.siteName}`,
    },
    robots: {
      follow: true,
      index: true,
    },
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="rtl" className={IRANSans.variable}>
      <HolyLoader color="#ff4500" speed={250} easing="linear" showSpinner />
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        {props.children}
      </body>
    </html>
  )
}
