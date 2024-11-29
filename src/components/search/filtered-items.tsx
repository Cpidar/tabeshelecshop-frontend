"use client"
import { FilteredItem } from "./filtered-item"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import isEmpty from "lodash/isEmpty"

const walkBFS = (root: any[]) => {
  if (root === null) return

  let queue = [...root], ans = [] as any

  while (queue.length) {
      const item = queue.shift()
      ans.push({id: item.id, name: item.name})
      if (item.category_children) queue = [...queue, ...item.category_children]
  }
  return ans
}

export const FilteredItems: React.FC<{items: any[]}> = ({items}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams?.getAll("category_id")

  const flattenItems = walkBFS(items)
  return (
    <div className="space-y-10">
      {!isEmpty(query) && (
        <div className="block -mb-3">
          <div className="flex items-center justify-between mb-4 -mt-1">
            <h3 className="text-brand-dark text-15px sm:text-base font-semibold">
              filters
            </h3>
            <button
              className="flex-shrink transition duration-150 ease-in text-13px focus:outline-none hover:text-brand-dark"
              aria-label="Clear All"
              onClick={() => {
                router.push(pathname || "")
              }}
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap -m-1">
            {Array.from(searchParams?.entries() || [])
              .map(
                ([k, v]) =>
                  !isEmpty(v) && (
                    <FilteredItem
                      itemKey={k}
                      itemValue={v}
                      itemName={flattenItems?.find(i => i.id == v)?.name}
                      key={v}
                    />
                  )
              )}
          </div>
        </div>
      )}
    </div>
  )
}
