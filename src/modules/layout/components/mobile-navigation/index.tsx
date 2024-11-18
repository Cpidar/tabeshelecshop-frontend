import { listMainCategories } from "@/lib/data"
import { enrichLineItems, retrieveCart } from "@/modules/cart/actions"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import BagIcon from "@/shared/Icons/BagIcon"
import BagIcon2withBadge from "@/shared/Icons/BagIcon2withBadge"
import HomeIcon from "@/shared/Icons/HomeIcon"
import UserIcon from "@/shared/Icons/UserIcon"
import MenuBar from "@/shared/MenuBar/MenuBar"
import { SquaresPlusIcon } from "@heroicons/react/16/solid"
import { LineItem } from "@medusajs/medusa"
import CategoryModal from "../category-modal"
import { ProductCategoryWithChildren } from "@/types/global"
import { CategoryModalContent } from "../category-accordion"
import { ModalProvider } from "../modal-context"

export default async function MobileNavigation() {
  const product_categories = (await listMainCategories(
    "main"
  )) as unknown as ProductCategoryWithChildren[]

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
          <BagIcon2withBadge />
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
