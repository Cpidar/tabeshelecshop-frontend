"use client"

import { Popover, Transition, Dialog } from "@/app/headlessui"
import { Fragment, useEffect, useRef, useState } from "react"
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
import { deleteLineItem, updateLineItem } from "@modules/cart/actions"
import { useCart } from "@/modules/cart/components/cart-context"
import CloseCart from "./close-cart"

export default function CartDropdown() {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { cart, updateCartItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const quantityRef = useRef(cart?.subtotal)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  useEffect(() => {
    if (totalItems && totalItems !== quantityRef.current && totalItems > 0) {
      if (!isOpen) {
        setIsOpen(true)
      }
      quantityRef.current = totalItems
    }
  }, [isOpen, totalItems, quantityRef])

  const totol = cart?.subtotal || 0

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
              {cart && (
                <LineItemPrice region={cart.region} item={item} style="tight" />
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <Counter
              value={item.quantity}
              onIncrement={() => {
                // optimistic cart update
                updateCartItem(item.variant_id!, "plus")
                // server action
                changeQuantity(item.quantity + 1)
              }}
              onDecrement={() => {
                // optimistic cart update
                updateCartItem(item.variant_id!, "minus")
                // server action
                changeQuantity(item.quantity - 1)
              }}
              variant="cart"
              disabled={item.variant.inventory_quantity < 1}
            />
            <div className="flex">
              <DeleteButton
                id={item.id}
                className="mt-1"
                data-testid="cart-item-remove-button"
                onDelete={() => {
                  updateCartItem(item.variant_id!, "delete")
                  deleteLineItem(item.id)
                }}
                disabled={item.sending}
                loading={item.sending}
              >
                { item.sending ? 'در حال ثبت ...' : 'حذف' }
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
            <Popover.Button className="flex" onClick={openCart}>
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
                  {cart?.items.length
                    ? formatAmount({
                        amount: totol || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })
                    : "0 تومان"}
                </span>
              </div>
            </Popover.Button>
            <Transition show={isOpen}>
              <Dialog onClose={closeCart} className="relative z-50">
                <Transition.Child
                  as={Fragment}
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="opacity-0 backdrop-blur-none"
                  enterTo="opacity-100 backdrop-blur-[.5px]"
                  leave="transition-all ease-in-out duration-200"
                  leaveFrom="opacity-100 backdrop-blur-[.5px]"
                  leaveTo="opacity-0 backdrop-blur-none"
                >
                  <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                  />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition-all ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">My Cart</p>
                      <button aria-label="Close cart" onClick={closeCart}>
                        <CloseCart />
                      </button>
                    </div>
                    {cart && cart.items?.length ? (
                      <>
                        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                          <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                            <h3 className="text-xl font-semibold">سبد خرید</h3>
                            <div className="divide-y divide-slate-300 dark:divide-slate-700">
                              {cart.items
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
                                  amount: cart.subtotal || 0,
                                  region: cart.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </p>
                            <div className="flex justify-around space-x-1 mt-5">
                              {/* <ButtonSecondary
                              href="/cart"
                              className="flex-1 border border-slate-200 dark:border-slate-700"
                              onClick={close}
                            >
                              مشاهده سبد خرید
                            </ButtonSecondary>
                            <div className="mx-1"></div> */}
                              {/* <ButtonPrimary
                              href="/checkout"
                              onClick={close}
                              className="flex-1"
                            >
                              تسویه حساب
                            </ButtonPrimary> */}
                              <ButtonPrimary
                                href="/cart"
                                onClick={close}
                                className="flex-1"
                              >
                                مشاهده سبد خرید
                              </ButtonPrimary>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                          <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                            <span>0</span>
                          </div>
                          <span>سبد خرید شما خالی است.</span>
                          <div>
                            <LocalizedClientLink href="/store">
                              <>
                                <span className="sr-only">
                                  Go to all products page
                                </span>
                                <Button onClick={close}>
                                  یه گشت دیگه تو فروشگاه بزن
                                </Button>
                              </>
                            </LocalizedClientLink>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
