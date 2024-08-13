import "@/styles/globals.css"
import "@/styles/index.scss"
// import "rc-slider/assets/index.css"
import { Metadata } from "next"
import HolyLoader from "holy-loader"
import { IRANSans } from "@/styles/font"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
