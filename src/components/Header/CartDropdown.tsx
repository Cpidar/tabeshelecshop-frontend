"use client"

import { Popover, Transition } from "@/app/headlessui"
import { Fragment, useState } from "react"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import Link from "next/link"
import { Cart, LineItem } from "@medusajs/medusa"
import LineItemPrice from "@/modules/common/components/line-item-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Button from "@/shared/Button/Button"
import Thumbnail from "@/modules/products/components/thumbnail"
import DeleteButton from "@/modules/common/components/delete-button"
import { formatAmount } from "@/lib/util/prices"
import Counter from "@/shared/Counter/Counter"
import { updateLineItem } from "@modules/cart/actions"

export default function CartDropdown({
  cart: cartState,
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null;
}) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const totol = cartState?.total || 0


  const renderProduct = (item: LineItem, index: number, close: () => void) => {
    const { title: name, thumbnail, cart_id, id } = item
    const { handle } = item.variant.product

    const changeQuantity = async (quantity: number) => {
      setError(null)
      setUpdating(true)
      console.log(id, quantity)
      const message = await updateLineItem({
        lineId: id,
        quantity,
      })
      .then(console.log)
        .catch((err) => {
          console.log(err.message)
          return err.message
        })
        .finally(() => {
          setUpdating(false)
        })
  
      message && setError(message)
    }

    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Thumbnail thumbnail={thumbnail} size="square" />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={`/products/${handle}`}
          />
        </div>

        <div className="ltr:ml-4 rtl:mr-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} href={`/products/${handle}`}>
                    {name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {/* <span>{`Natural`}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span> */}
                </p>
              </div>
              {/* <Prices price={price} className="mt-0.5" /> */}
              {cartState && (
                <LineItemPrice
                  region={cartState.region}
                  item={item}
                  style="tight"
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <Counter
              value={item.quantity}
              onIncrement={() => changeQuantity(item.quantity+1)}
              onDecrement={() => changeQuantity(item.quantity-1)}
              variant="cart"
              disabled={item.variant.inventory_quantity < 1}
            />
            <div className="flex">
              <DeleteButton
                id={item.id}
                className="mt-1"
                data-testid="cart-item-remove-button"
              >
                حذف
              </DeleteButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            {/* <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 ltr:right-1.5 ltr:left-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">{totalItems}</span>
            </div>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button> */}
            <Popover.Button className="flex">
              <div className="mr-2 lg:mr-4 relative inline-block">
                <div className="absolute -top-1 ltr:right-0 rtl:left-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                  {totalItems}
                </div>
                <svg
                  className="svg-inline--fa fa-shopping-cart fa-w-18 fa-9x h-9 lg:h-10 p-2 text-gray-500"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="shopping-cart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                  ></path>
                </svg>
              </div>
              <div className="mr-4 hidden sm:flex flex-col font-bold">
                <span className="text-xs text-gray-400">سبد خرید شما</span>
                <span>
                  {
                  cartState ?
                  formatAmount({
                    amount: totol || 0,
                    region: cartState.region,
                    includeTaxes: false,
                  }) :
                  "0 تومان"
                }
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="hidden md:block absolute z-20 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 lrt:-right-28 rtl:-left-28 ltr:sm:right-0 rtl:sm:left-0 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <div className="relative bg-white dark:bg-neutral-800">
                    {cartState && cartState.items?.length ? (
                      <>
                        <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                          <h3 className="text-xl font-semibold">سبد خرید</h3>
                          <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {cartState.items
                              .sort((a, b) => {
                                return a.created_at > b.created_at ? -1 : 1
                              })
                              .map((item, index) =>
                                renderProduct(item, index, close)
                              )}
                          </div>
                        </div>
                        <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                          <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                            <span>
                              <span>مجموع</span>
                              {/* <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                                Shipping and taxes calculated at checkout.
                              </span> */}
                            </span>
                            <span className="">
                              {formatAmount({
                                amount: cartState.subtotal || 0,
                                region: cartState.region,
                                includeTaxes: false,
                              })}
                            </span>
                          </p>
                          <div className="flex justify-around space-x-1 mt-5">
                            <ButtonSecondary
                              href="/cart"
                              className="flex-1 border border-slate-200 dark:border-slate-700"
                              onClick={close}
                            >
                              مشاهده سبد خرید
                            </ButtonSecondary>
                            <div className="mx-1"></div>
                            <ButtonPrimary
                              href="/checkout"
                              onClick={close}
                              className="flex-1"
                            >
                              تسویه حساب
                            </ButtonPrimary>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                          <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                            <span>0</span>
                          </div>
                          <span>Your shopping bag is empty.</span>
                          <div>
                            <LocalizedClientLink href="/store">
                              <>
                                <span className="sr-only">
                                  Go to all products page
                                </span>
                                <Button onClick={close}>
                                  Explore products
                                </Button>
                              </>
                            </LocalizedClientLink>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
