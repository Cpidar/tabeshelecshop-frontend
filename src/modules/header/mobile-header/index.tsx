import React, { FC } from "react"
import MobileSearchButton from "../mobile-search-button"

interface BagIconProps {
  className?: string
}

const MobileHeader: FC<BagIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <div className="sticky top-0 left-0 w-full z-30 bg-white">
      <div>
        <header className="lg:hidden px-4 lg:py-2 py-3 relative flex items-center z-5 bg-white shadow-none border-solid border-b-[1px] border-0 border-neutral-100 shadow-1-bottom">
          <div className="relative ml-0 w-full">
            <div className="BaseLayoutSearch_BaseLayoutSearch__QHPTB">
              <div
                data-cro-id="searchbox-click"
                className="flex items-center SearchInput_SearchInput__HB9qi SearchInput_SearchInput__searchInput__CEpaj ellipsis  h-10 border-none bg-neutral-100 grow rounded px-0 lg:px-4 text-body-2"
              >
                <MobileSearchButton />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default MobileHeader
