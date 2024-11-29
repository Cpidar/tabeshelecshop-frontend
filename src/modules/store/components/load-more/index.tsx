"use client"

import Spinner from "@/components/loaders/spinner/spinner"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import ButtonSecondary from "@/components/Button/ButtonSecondary"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useInfiniteScroll from "react-infinite-scroll-hook"

export default function LoadMore({
  loading,
  hasNextPage,
  page,
}: {
  loading: boolean
  hasNextPage: boolean
  page: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () =>
      router.push(`${pathname}?page=${page + 1}`, { scroll: false }),
    rootMargin: "0px 0px 800px 0px",
  })

  return <div className="flex w-full justify-center mt-8" ref={sentryRef}>{(loading || hasNextPage) && <ButtonSecondary loading={true} >در حال دریافت محصولات</ButtonSecondary>}</div>
}
