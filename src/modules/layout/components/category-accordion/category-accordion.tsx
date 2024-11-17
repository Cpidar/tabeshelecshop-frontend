"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Image from '@/shared/Image/Image';
import { ProductCategoryWithChildren } from '@/types/global';
import placeholder from '@/images/placeholders/category.png'
function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-3.5 3xl:py-4',
  item,
  depth = 0,
}: {
  className?: string
  item: ProductCategoryWithChildren
  depth?: number
}) {
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedCategories = searchParams.getAll("category_id")
  
  const isActive =
    checkIsActive(selectedCategories, item.handle) ||
    item?.category_children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.slug)
    );
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { id, handle, name, category_children: items, icon } = item;
  const [ displaySidebar, closeSidebar ] = useState(false);
  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {

      push(`http://localhost:8000/ir/categories/${handle}`)

      displaySidebar && closeSidebar(true);
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-base text-brand-dark text-opacity-40" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
    ) : (
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-base text-brand-dark text-opacity-40" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path></svg>
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-fill-base': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 }
          )}
          // onClick={handleChange}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                src={icon ?? placeholder}
                alt={name || "image"}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="text-brand-dark capitalize py-0.5">{name}</span>
          {expandIcon && (
            <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
          )}
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="px-4 text-xs">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-border-base first:border-t-0 mx-[3px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryAccordion({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryAccordion;
