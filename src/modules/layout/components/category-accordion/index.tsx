"use client"
import Heading from "@/shared/Heading/Heading2"
import CategoryFilterMenu from "@/components/search/category-filter-menu"
// import Scrollbar from '@components/ui/scrollbar';
import { ProductCategoryWithChildren } from "@/types/global"
import { ProductCategory } from "@medusajs/product"
import CategoryAccordion from "./category-accordion"
import { useModal } from "../modal-context"

export const CategoryModalContent = ({
  product_categories,
}: {
  product_categories: ProductCategoryWithChildren[]
}) => {
  const { toggleModal } = useModal()

  return (
    <div className="relative flex flex-col w-full mx-auto overflow-hidden rounded-t bg-brand-light h-inherit">
      <CategoryAccordion items={product_categories} className="w-full" />
      <div className="bottom-0 w-full p-4 text-brand-light shadow-card shrink-0 bg-brand-light">
        <button
          aria-label="Close Modal"
          className="w-full bg-fill-base tracking-[0.025em] rounded-md transition text-brand-dark duration-200 h-14 text-center font-semibold text-sm block hover:bg-yellow-400 hover:text-brand-light focus:outline-none"
          onClick={() => toggleModal()}
        >
          بستن
        </button>
      </div>
    </div>
  )
}
