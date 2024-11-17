import { ProductCategoryWithChildren } from "@/types/global"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import placeholder from "@/images/placeholders/category.png"

function SidebarMenuItem({
  className,
  item,
  depth = 0,
}: {
  className?: string
  item: ProductCategoryWithChildren
  depth?: number
}) {
  const params = useParams()
  const router = useRouter()
  const active = params?.category

  const isActive =
    active === item.handle ||
    item?.category_children?.some((_item) => _item.handle === active)

  const [isOpen, setOpen] = useState<boolean>(isActive)

  useEffect(() => {
    setOpen(isActive)
  }, [isActive])

  const { handle, name, category_children: items, icon } = item
  // const { displaySidebar, closeSidebar } = useUI()

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue)
  }

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse()
    } else {
      router.push("/")
      // displaySidebar && closeSidebar()
    }
  }

  let expandIcon
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        className="text-base text-brand-dark text-opacity-40"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
      </svg>
    ) : (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        className="text-base text-brand-dark text-opacity-40"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path>
      </svg>
    )
  }

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : "text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3"
        } ${isOpen ? "bg-fill-base" : "text-brand-dark text-opacity-70"}`}
      >
        <button
          className={
            "flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark"
          }
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? placeholder}
                alt={name || "image"}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {name}
          </span>
          <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul
            key="content"
            className="py-3 text-xs border-t border-border-base"
          >
            {items?.map((currentItem) => {
              const childDepth = depth + 1
              return (
                <SidebarMenuItem
                  key={`${currentItem.name}${currentItem.handle}`}
                  item={currentItem}
                  depth={childDepth}
                  className={
                    "text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4"
                  }
                />
              )
            })}
          </ul>
        </li>
      ) : null}
    </>
  )
}

function CategoryAccordion({ items, className }: any) {
  return (
    <ul className={`${className}`}>
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  )
}

export default CategoryAccordion
