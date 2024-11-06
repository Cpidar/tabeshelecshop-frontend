import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">صفحه موردنظر یافت نگردید</h1>
      <p className="text-small-regular text-ui-fg-base">
      شما چیزی در سبد خرید ندارید. بیایید آن را تغییر دهیم، از پیوند زیر برای شروع مرور محصولات ما استفاده کنید.
      </p>
      <InteractiveLink href="/store">به فروشگاه برو</InteractiveLink>
    </div>
  )
}
