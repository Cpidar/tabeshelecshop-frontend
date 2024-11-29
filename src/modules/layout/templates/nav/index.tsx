import React, { FC } from "react"
import MainNav5 from "../../components/header"
import HighlightedBar from "../../components/topbar"
import Link from "next/link"
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../../keystatic.config"

const reader = createReader(process.cwd(), keystaticConfig)

export interface HeaderLoggedProps {
  countryCode: string
}

const HeaderLogged: FC<HeaderLoggedProps> = async ({
  countryCode
}) => {
  const settings = await reader.singletons.settings.read()
  const topBar = settings?.header.topBar

  return (
    <div className="nc-HeaderLogged top-0 w-full z-40 ">
      {topBar?.discriminant && (
        <HighlightedBar variant="highlightedTwo" className="text-[#460135]">
          <div className="text-sm font-medium py-0.5 ltr:pr-6 rtl:pl-6">
            <span>
              {topBar.value.description}
              <Link
                href={topBar.value.buttonLink!}
                className="inline-flex text-xs uppercase font-bold ltr:pl-1.5 rtl:pr-1.5 items-center relative transition-all top-[1px] hover:opacity-80"
              >
                <span className="border-b border-[#460135] inline-block pb-0.5">
                  {topBar.value.buttonText}
                </span>
              </Link>
            </span>
          </div>
        </HighlightedBar>
      )}
      <MainNav5 countryCode={countryCode} />
    </div>
  )
}

export default HeaderLogged
