import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import BagIcon2withBadge from "@/shared/Icons/BagIcon2withBadge"
import HomeIcon from "@/shared/Icons/HomeIcon"
import UserIcon from "@/shared/Icons/UserIcon"
import MenuBar from "@/shared/MenuBar/MenuBar"
import CategoryModal from "../category-modal"
import { CategoryModalContent } from "../category-accordion"
import { ModalProvider } from "../modal-context"
import { getCategoryByHandle } from "@/lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export default async function MobileNavigation({
  cart,
}: {
  cart: HttpTypes.StoreCart
}) {
  const product_categories = await getCategoryByHandle(["main"])
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0
  // const cart = await fetchCart()
  // const totalItems =
  //   cart?.items?.reduce((acc, item) => {
  //     return acc + item.quantity
  //   }, 0) || 0
  return (
    <ModalProvider>
      <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-14 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
        <MenuBar />
        <CategoryModal>
          <CategoryModalContent product_categories={product_categories} />
        </CategoryModal>
        <LocalizedClientLink
          href="/"
          className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
        >
          <HomeIcon />
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/cart"
          className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
        >
          <BagIcon2withBadge badgeNumber={totalItems} />
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/account"
          className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
        >
          <UserIcon />
        </LocalizedClientLink>
      </div>
    </ModalProvider>
  )
}
