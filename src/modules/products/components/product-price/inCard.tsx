import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function InCardProductPrice({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const selectedPrice = cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <>
      <div className="flex justify-between px-4 pb-4">
        {selectedPrice.price_type === "sale" ? (
          <>
            <div className="min-w-6 lg:min-w-7 flex h-[17px] !items-center justify-center gap-1 rounded-[3px] px-1 lg:h-[19px] bg-red-600">
              <span className="flex !items-center justify-center pt-[1px] text-center text-sm font-semiBold leading-4 text-white lg:pt-[3px]">
                % {selectedPrice.percentage_diff}
              </span>
            </div>
            <div className="flex flex-col items-end gap-[6px]">
              <p className="text-[16px] font-semiBold leading-5 text-red-600">
                {selectedPrice.calculated_price}
                {/* <span className="text-xs font-medium mr-1  font-semiBold leading-5 text-red-600">
                    تومان
                  </span> */}
              </p>
              <div className="flex pl-[1px]">
                <p className="text-sm leading-5 text-gray-600 line-through">
                  {selectedPrice.original_price}
                </p>
                {/* <span className="text-gray-800 text-xs font-medium mr-1  font-semiBold leading-5">
                    تومان
                  </span> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <div />
            <p className=" text-base font-semiBold leading-5 text-gray-800">
              {selectedPrice.original_price_number?.toLocaleString()}
              <span className="text-xs font-medium mr-1 font-semiBold leading-5 text-gray-600">
                تومان
              </span>
            </p>
          </>
        )}

        {/* <Prices price={price} /> */}
        {/* <div className="hidden lg:flex items-center mb-0.5">
            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
              {rating || ""} ({numberOfReviews || 0} reviews)
            </span>
          </div> */}
      </div>
    </>
  )
}
