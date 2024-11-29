import React, { FC } from "react"
import Logo from "@/components/Logo/Logo"
import MenuBar from "@/components/MenuBar/MenuBar"
import AvatarDropdown from "../avatar-dropdown"
import Navigation from "@/components/Navigation/Navigation"
import CartButton from "@/modules/layout/components/cart-button"
import SearchModal from "@/modules/search/templates/search-modal"
import CategoriesButton from "@/modules/layout/components/categories-button"
import Button from "@/components/Button/Button"
import Link from "next/link"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import ButtonSecondary from "@/components/Button/ButtonSecondary"
import MobileSearchHeader from "../mobile-header"
import { PhoneIcon, PhoneArrowUpRightIcon } from "@heroicons/react/24/solid"
import keystaticConfig from "../../../../../keystatic.config"
import { createReader } from "@keystatic/core/reader"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { getCustomer } from "@/lib/data/customer"
import { retrieveCart } from "@/lib/data/cart"
import { useParams } from "next/navigation"
import { CartProvider } from "@/modules/cart/components/cart-context"

const reader = createReader(process.cwd(), keystaticConfig)

export interface MainNav2LoggedProps {
  countryCode: string
}

const MainNav2Logged: FC<MainNav2LoggedProps> = async ({ countryCode }) => {
  // const inputRef = createRef<HTMLInputElement>()
  // const router = useRouter()
  const settings = await reader.singletons.settings.read()

  const customer = await getCustomer()
  const cart = await retrieveCart()

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   router.push("/search")
        //   inputRef.current?.blur()
        // }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            // ref={inputRef}
            type="text"
            placeholder="Type and press enter"
            className="border-gray-300 bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
          />
          {/* <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button> */}
        </div>
        <input type="submit" hidden value="" />
      </form>
    )
  }

  const renderContent = () => {
    return (
      <>
        {/* upper part */}
        <div className="w-full border-b hidden lg:block">
          <div className="container h-20 flex justify-between">
            <div className="lg:flex-1 flex items-center">
              <Logo className="flex-shrink-0" />
            </div>

            {/* <div className="flex-[2] hidden lg:flex justify-center mx-4"> */}
            {/* {renderSearchForm()} */}
            <SearchModal />
            {/* <SearchForm /> */}
            {/* </div> */}

            <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
              {/* {!showSearchForm && (
                <button
                  className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                  onClick={() => setShowSearchForm(!showSearchForm)}
                >
                  {renderMagnifyingGlassIcon()}
                </button>
              )} */}
              <div className="hidden lg:block">
                {customer ? (
                  <AvatarDropdown customer={customer} />
                ) : (
                  <Link href={"/auth"}>
                    <ButtonSecondary>
                      <span className="text-xs">ورود | ثبت نام</span>
                    </ButtonSecondary>
                  </Link>
                )}
              </div>
              <div className="hidden lg:block">
                <CartProvider countryCode={countryCode} cart={cart}>
                  <CartButton />
                </CartProvider>
              </div>
            </div>
          </div>
        </div>

        {/* lower part */}
        <div className="w-full">
          <div className="container h-20 hidden lg:flex justify-between">
            {/* <div className="lg:flex-1 flex items-center">
            <Logo className="flex-shrink-0" />
          </div> */}
            <div className="hidden lg:flex items-center">
              <CategoriesButton />
            </div>

            <div className="flex-1 hidden lg:flex justify-end mx-4">
              <Navigation />
            </div>
            <div className="flex items-center">
              <Link href={`tel:${settings?.header.CTA}`}>
                <ButtonPrimary className="font-bold px-4 xl:px-6 py-2 xl:py-3 rounded flex-shrink-0 flex items-center">
                  <span className="ml-2 text-sm">{settings?.header.CTA}</span>
                  <PhoneArrowUpRightIcon className="w-6 h-6 p-1" />
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="">{renderContent()}</div>
    </div>
  )
}

export default MainNav2Logged
