"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter, usePathname } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box/SearchBox01"
import { useEffect, useRef, useState } from "react"
import useOnClickOutside from "@/utils/use-click-outside"

export default function SearchModal({
  onClickClose,
}: {
  onClickClose?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [showBackdrop, setShowBackdrop] = useState(false)

  const searchRef = useRef(null)
  useOnClickOutside(searchRef, (e) => setShowBackdrop(false))

  useEffect(() => {
    console.log(pathname)
    setShowBackdrop(false)
  }, [pathname])

  // disable scroll on body when modal is open
  // useEffect(() => {
  //   document.body.style.overflow = "hidden"
  //   return () => {
  //     document.body.style.overflow = "unset"
  //   }
  // }, [])

  // on escape key press, close modal
  // useEffect(() => {
  //   const handleEsc = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setShowBackdrop(false)
  //     }
  //   }
  //   window.addEventListener("keydown", handleEsc)

  //   // cleanup
  //   return () => {
  //     window.removeEventListener("keydown", handleEsc)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="relative z-30 flex-[2] flex justify-center mx-4 transition-all duration-200 ease-in-out">
      {showBackdrop && (
        <div className="hidden lg:block fixed inset-0 bg-opacity-75 backdrop-blur-md opacity-100 h-screen w-screen" />
      )}
      {/* <div className="fixed inset-0 px-5 sm:p-0" ref={searchRef}> */}
      {/* <div className="flex flex-col w-full mx-auto"> */}
      <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
        <div className="w-full m-auto" ref={searchRef}>
          <SearchBox onFocus={() => setShowBackdrop(true)} />
          <div className="w-full absolute top-[56px] mt-6">
            {showBackdrop && (
              <Hits
                className="lg:rtl:translate-x-[12.5%] lg:ltr:translate-x-[-12.5%]"
                hitComponent={Hit}
                onClickClose={onClickClose}
              />
            )}
          </div>
        </div>
      </InstantSearch>
      {/* </div> */}
      {/* </div> */}
    </div>
  )
}
