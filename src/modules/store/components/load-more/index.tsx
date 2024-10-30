"use client"

import Spinner from "@/components/loaders/spinner/spinner"
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

  return <div ref={sentryRef}>{(loading || hasNextPage) && <Spinner />}</div>
}
