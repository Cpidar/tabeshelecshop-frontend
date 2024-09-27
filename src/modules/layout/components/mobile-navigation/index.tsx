import { enrichLineItems, retrieveCart } from "@/modules/cart/actions"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import BagIcon from "@/shared/Icons/BagIcon"
import BagIcon2withBadge from "@/shared/Icons/BagIcon2withBadge"
import HomeIcon from "@/shared/Icons/HomeIcon"
import UserIcon from "@/shared/Icons/UserIcon"
import MenuBar from "@/shared/MenuBar/MenuBar"
import { LineItem } from "@medusajs/medusa"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function MobileNavigation() {
  const cart = await fetchCart()
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0
  return (
    <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-14 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
      <MenuBar />
      <LocalizedClientLink href="/store" className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center">
        <BagIcon />
      </LocalizedClientLink>
      <LocalizedClientLink href="/" className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center">
        <HomeIcon />
      </LocalizedClientLink>
      <LocalizedClientLink href="/cart" className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center">
        <BagIcon2withBadge totalItems={totalItems} />
      </LocalizedClientLink>
      <LocalizedClientLink href="/account" className="rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center">
        <UserIcon />
      </LocalizedClientLink>
    </div>
  )
}
