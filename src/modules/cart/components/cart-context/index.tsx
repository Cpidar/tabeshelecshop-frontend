"use client"

import type { Cart, LineItem, Region } from "@medusajs/medusa"
import { PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
} from "react"
import { getOrSetCart } from "../../actions"

type UpdateType = "plus" | "minus" | "delete"
type CartDTO = Pick<Cart, "subtotal" | "items" | "id" | "region">
type LineItemDTO = Pick<
  LineItem,
  "variant_id" | "id" | "quantity" | "subtotal" | "unit_price"
>
type CartAction =
  | {
      type: "UPDATE_ITEM"
      payload: { variantId: string; updateType: UpdateType }
    }
  | { type: "ADD_ITEM"; payload: { variant: PricedVariant; quantity: number } }

type CartContextType = {
  cart: CartDTO | undefined
  updateCartItem: (variantId: string, updateType: UpdateType) => void
  addCartItem: (variant: PricedVariant, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function calculateItemCost(quantity: number, price: number): number {
  return Number(price) * quantity
}

function updateCartItem(
  item: Omit<LineItem, "beforeInsert">,
  updateType: UpdateType
): Omit<LineItem, "beforeInsert"> | null {
  if (updateType === "delete") return null

  let newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1
  if (newQuantity > item.variant.inventory_quantity)
    newQuantity = item.variant.inventory_quantity
  if (newQuantity === 0) return null

  const singleItemAmount = Number(item.unit_price)
  const newTotalAmount = calculateItemCost(newQuantity, singleItemAmount)

  return {
    ...item,
    quantity: newQuantity,
    subtotal: newTotalAmount,
    sending: true,
  } as unknown as LineItem
}

function createOrUpdateCartItem(
  existingItem: LineItem | undefined,
  variant: PricedVariant & { thumbnail: string },
  quantity: number
): LineItem {
  const newQuantity = existingItem ? existingItem.quantity + quantity : quantity
  const totalAmount = calculateItemCost(quantity, variant.calculated_price!)
  return {
    id: existingItem?.id!,
    title: variant.product?.title,
    description: variant.title,
    quantity: newQuantity,
    variant_id: variant.id!,
    unit_price: variant.calculated_price!,
    subtotal: totalAmount,
    thumbnail: variant.thumbnail,
    variant: {
      product: {
        handle: variant.product?.handle,
      },
    },
    sending: true,
  } as unknown as LineItem
}

function updateCartTotals(
  lines: Omit<LineItem, "beforeInsert">[],
  cart: CartDTO
): CartDTO {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  )

  return {
    ...cart,
    subtotal: totalAmount,
  }
}

function createEmptyCart(): CartDTO {
  return {
    id: "",
    region: {} as Region,
    subtotal: 0,
    items: [],
  }
}

function cartReducer(state: CartDTO | undefined, action: CartAction): CartDTO {
  const currentCart = state || createEmptyCart()

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { variantId, updateType } = action.payload
      const updatedLines = currentCart.items
        .map((item) =>
          item.variant_id === variantId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as LineItem[]

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          items: [],
          subtotal: currentCart.subtotal,
        }
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines, currentCart),
        items: updatedLines,
      }
    }
    case "ADD_ITEM": {
      const { variant, quantity } = action.payload
      const existingItem = currentCart.items.find(
        (item) => item.variant_id === variant.id
      )
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        quantity
      )

      const updatedLines = existingItem
        ? currentCart.items.map((item) =>
            item.variant_id === variant.id ? updatedItem : item
          )
        : [...currentCart.items, updatedItem]

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines, currentCart),
        items: updatedLines,
      }
    }
    default:
      return currentCart
  }
}

export function CartProvider({
  children,
  cartPromise,
  countryCode,
}: {
  children: React.ReactNode
  cartPromise: Promise<Omit<
    Cart,
    "refundable_amount" | "refunded_total"
  > | null>
  countryCode: string
}) {
  // let initialCart = useRef<Cart | undefined>()
  const initialCart = use(cartPromise)
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  )

  useEffect(() => {
    if (!initialCart) {
      getOrSetCart(countryCode)
    }
  }, [initialCart, countryCode])

  // useEffect(() => {
  //   async function initializeCart() {
  //     if (!initialCart.current) {
  //       initialCart.current = await getOrSetCart(countryCode)
  //     }
  //   }
  //   console.log(initialCart.current)
  //   initializeCart()
  // }, [countryCode])

  const updateCartItem = (variantId: string, updateType: UpdateType) => {
    updateOptimisticCart({
      type: "UPDATE_ITEM",
      payload: { variantId, updateType },
    })
  }

  const addCartItem = (variant: PricedVariant, quantity: number = 1) => {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { variant, quantity } })
  }

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [optimisticCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
