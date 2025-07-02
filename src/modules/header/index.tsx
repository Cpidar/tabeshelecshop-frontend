import React, { FC } from "react"
import MainNav5 from "./header"
import HighlightedBar from "./topbar"
import Link from "next/link"
import keystaticConfig from "../../../keystatic.config"
import type { Header, Setting } from "@/payload-types"
import RichText from "@/components/RichText"
import { getCachedGlobal } from "@/utils/getGlobals"
import MobileHeader from "./mobile-header"

export interface HeaderLoggedProps {
  countryCode: string
}

const HeaderLogged: FC<HeaderLoggedProps> = async ({ countryCode }) => {
  const headerData: Header = await getCachedGlobal("header", 1)()
  const settings: Setting = await getCachedGlobal("settings", 1)()

  return (
    <>
      <div className="nc-HeaderLogged top-0 w-full z-40 ">
        {headerData.notificationsBar?.enable && (
          <HighlightedBar variant="highlightedTwo" className="text-[#460135]">
            {headerData.notificationsBar.text && (
              <RichText
                data={headerData.notificationsBar.text}
                className="text-center whitespace-nowrap text-sm font-medium py-0.5 ltr:pr-6 rtl:pl-6"
              />
            )}
          </HighlightedBar>
        )}
        <MainNav5
          countryCode={countryCode}
          data={headerData}
          settings={settings}
        />
      </div>
      <MobileHeader />
    </>
  )
}

export default HeaderLogged
