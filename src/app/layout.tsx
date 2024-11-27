import "@/styles/globals.css"
import "@/styles/index.scss"
// import "rc-slider/assets/index.css"
import { Metadata } from "next"
import HolyLoader from "holy-loader"
import { IRANSans } from "@/styles/font"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../keystatic.config"
import { getBaseURL } from "@lib/util/env"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env

const reader = createReader(process.cwd(), keystaticConfig)

export async function generateMetadata(): Promise<Metadata> {
  const settings = await reader.singletons.settings.read()

  return {
    metadataBase: new URL(getBaseURL()),
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <HolyLoader color="#ff4500" speed={250} easing="linear" showSpinner />
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        {props.children}
      </body>
    </html>
  )
}
