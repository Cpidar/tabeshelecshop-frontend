"use client"

import SearchIcon from "@/components/Icons/SearchIcon"
import logoImg from "@/images/logo.svg"
import Image from "next/image"
import React, { FC, useState, Fragment } from "react"
import { Transition, Dialog } from "@/app/headlessui"
import MobileSearchPanel from "../mobile-search-panel"

interface BagIconProps {
  className?: string
}

const MobileSearchButton: FC<BagIconProps> = ({ className = "w-5 h-5" }) => {
  const [isVisable, setIsVisable] = useState(false)

  const handleOpenMenu = () => setIsVisable(true)
  const handleCloseMenu = () => setIsVisable(false)

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md md:w-auto z-max outline-none focus:outline-none">
            <React.Fragment>
              <Transition.Child
                as={Fragment}
                enter="transition duration-300 transform"
                enterFrom="opacity-100 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-100 translate-y-full"
              >
                <div className="z-20 relative">
                  <MobileSearchPanel onClickClose={handleCloseMenu} />
                </div>
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter=" duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave=" duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
              </Transition.Child>
            </React.Fragment>
          </div>
        </Dialog>
      </Transition>
    )
  }
  return (
    <>
      <div className="w-full rounded-full">
        <button
          onClick={handleOpenMenu}
          className="flex items-center justify-between grow min-w-0 h-9 px-3"
        >
          <div className="flex cursor-pointer">
            <SearchIcon />
          </div>
          <span
            data-cro-id="searchbox-type"
            className="grow px-2 lg:px-4 h-10 ellipsis"
          >
            <div className="lg:text-body-2 text-button-1 flex items-center h-full text-body-2 text-neutral-500">
              <div className="flex gap-1 items-center">
                <span className="lg:text-subtitle text-button-1 text-neutral-500 opacity-70">
                  جستجو در
                </span>
                <div>
                  <Image
                    className={`block h-4 sm:h-10 w-auto`}
                    src={logoImg}
                    alt="Logo"
                    sizes="200px"
                    priority
                  />
                </div>
              </div>
            </div>
          </span>
        </button>
      </div>

      {renderContent()}
    </>
  )
}

export default MobileSearchButton
