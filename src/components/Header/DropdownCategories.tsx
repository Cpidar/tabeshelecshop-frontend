"use client"

import { Bars3Icon, ChevronLeftIcon } from "@heroicons/react/16/solid"
import { ProductCategory } from "@medusajs/medusa"
import {
  Menu,
  MenuItem as MenuItemInner,
  SubMenu as SubMenuInner,
  MenuButton,
  MenuDivider,
  SubMenuProps,
  MenuState,
  MenuProps,
  MenuItemProps,
  ClassNameProp,
} from "@szhsin/react-menu"

const menuClassName = ({ state }: { state: MenuState }) =>
  `box-border z-50 text-sm bg-white p-1.5 border rounded-md shadow-lg select-none focus:outline-none min-w-[9rem] w-64 md:w-72 ${
    state === "opening" && "animate-fadeIn"
  } ${state === "closing" && "animate-fadeOut"}`

const menuItemClassName: ClassNameProp<{
  submenu?: boolean
  hover: boolean
  disabled: boolean
}> = ({ hover, disabled, submenu }) =>
  `block rounded-md px-3 py-1.5 focus:outline-none ${
    hover && "text-white bg-primary"
  } ${disabled && "text-gray-400"} ${submenu && "flex items-center"}`

const MenuItem = (props: MenuItemProps) => (
  <>
    <MenuItemInner {...props} className={menuItemClassName} />
    <MenuDivider className="h-px bg-gray-200 mx-2.5 my-1.5 last:hidden" />
  </>
)

const SubMenu = (props: SubMenuProps) => (
  <>
    <SubMenuInner
      {...props}
      label={
        <>
          {props.label}
          <ChevronLeftIcon className="mr-auto h-3" />
        </>
      }
      shift={7}
      className="relative"
      menuClassName={menuClassName}
      itemProps={{ className: menuItemClassName }}
    />
    <MenuDivider className="h-px bg-gray-200 mx-2.5 my-1.5 last:hidden" />
  </>
)

export default function DropdownCategories({
  items,
  className,
}: {
  items: ProductCategory[]
  className?: string
}) {
  return (
    <Menu
      align={"end"}
      position={"anchor"}
      transition={false}
      gap={5}
      menuClassName={menuClassName}
      menuButton={
        <MenuButton className="bg-yellow-400 hover:bg-gray-700 font-bold uppercase px-4 xl:px-6 py-2 xl:py-3 rounded flex-shrink-0 flex items-center">
          <Bars3Icon className="h-8 p-1" />
          <span className="ml-4">دسته بندی محصولات</span>
        </MenuButton>
      }
    >
      {items?.map((item) =>
        item.category_children?.length > 0 ? (
          <SubMenu direction="left" gap={10} key={item.id} label={item.name}>
            {item.category_children.map((subItem) => (
              <MenuItem
                key={subItem.id}
                href={`/ir/categories/${subItem.handle}`}
              >
                {subItem.name}
              </MenuItem>
            ))}
          </SubMenu>
        ) : (
          <>
            <MenuItem key={item.id} href={`/ir/categories/${item.handle}`}>
              {item.name}
            </MenuItem>
          </>
        )
      )}
    </Menu>
  )
}
