"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React, { ComponentProps } from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: ComponentProps<typeof Link>) => {
  const { countryCode } = useParams()

  const isDefault = countryCode === process.env.NEXT_PUBLIC_DEFAULT_REGION

  const normalizedPath = href.toString();
  const isExternalLink = normalizedPath.startsWith("https://");
  const isDeepLink = normalizedPath.startsWith("#");
  const localizedHref =
    isExternalLink || isDeepLink || isDefault
      ? href
      : `/${countryCode}${normalizedPath.startsWith("/") ? "" : "/"}${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
