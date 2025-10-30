// import { Cart, User } from '@/payload-types'
// import { Product } from '@/types/product'
// import { BasePayload } from 'payload'

// interface UserWithCart extends Omit<User, 'cart'> {
//   cart: Cart
// }

// export async function checkAndAdjustCartStock() {
//   const { cart, user } = await getUserCart()
//   let cartChanged = false

//   const updatedLineItems = await Promise.all(
//     (cart.lineItems || []).map(async (item) => {
//       let productId: number
//       if (typeof item.product === 'number') {
//         productId = item.product
//       } else {
//         productId = (item.product as { id: number }).id
//       }

//       const response = await fetch(`/api/products/${productId}?depth=2`)
//       if (!response.ok) {
//         return item
//       }
//       const product: Product = await response.json()

//       // Find the variant and its inventory
//       const variant = product.variants?.find(v => v.id === item.productVariant)
//       const availableStock = variant?.inventory_quantity || 0

//       if (item.quantity > availableStock) {
//         cartChanged = true
//         if (availableStock > 0) {
//           // Get the price from variant's prices array
//           const price = variant?.prices[0]?.amount || 0
//           return {
//             ...item,
//             quantity: availableStock,
//             linePrice: (price * availableStock) / 100, // Convert from cents
//           }
//         } else {
//           return null
//         }
//       }
//       return item
//     }),
//   )

//   // Remove any null items (those that were removed due to zero stock).
//   const filteredLineItems = updatedLineItems.filter((item) => item !== null)

//   // If there were changes, update the cart.
//   if (cartChanged) {
//     const updatedCart = { ...cart, lineItems: filteredLineItems }
//     await updateUserCart(updatedCart)
//     window.dispatchEvent(new Event('cartUpdated'))
//     return updatedCart
//   }
//   return cart
// }

// /**
//  * Fetch the current cart.
//  * If a user is logged in, fetch their cart from the server.
//  * Otherwise, get the cart from localStorage (stored as an object).
//  */
// export const getUserCart = async (): Promise<{
//   cart: Cart
//   user: UserWithCart | null
// }> => {
//   const response = await fetch('/api/users/me', { cache: 'no-cache', credentials: 'include' })
//   const data = await response.json()
//   const { user }: { user: UserWithCart | null } = data

//   let cart: Cart

//   if (user) {
//     // Fetch the cart from the server.
//     const userCartResponse = await fetch(`/api/carts?where[customer][equals]=${user.id}`, {
//       cache: 'no-cache',
//       credentials: 'include',
//     })
//     const cartData = await userCartResponse.json()

//     // Assume the server returns a cart object in the correct shape.
//     cart = cartData.docs[0] || { lineItems: [], discountCode: null, total: 0 }
//   } else {
//     // For localStorage, expect an object.
//     const localCartRaw = localStorage.getItem('cart')
//     let localCart
//     try {
//       localCart = JSON.parse(localCartRaw || '[]')
//       if (Array.isArray(localCart)) {
//         localCart = {
//           lineItems: localCart,
//           discountCode: null,
//           total: localCart.reduce(
//             (t: number, item: { linePrice: number }) => t + item.linePrice,
//             0,
//           ),
//         }
//       }
//     } catch (e) {
//       localCart = { lineItems: [], discountCode: null, total: 0 }
//     }
//     cart = localCart
//   }

//   return { cart, user }
// }

// export async function updateProductStock(
//   payload: BasePayload,
//   productId: number,
//   quantityPurchased: number,
//   variantId?: string,
// ) {
//   const product = await payload.findByID({
//     collection: 'products',
//     id: productId,
//   }) as Product

//   const updatedVariants = product.variants.map(variant => {
//     if (variant.id === variantId) {
//       return {
//         ...variant,
//         inventory_quantity: Math.max((variant.inventory_quantity || 0) - quantityPurchased, 0)
//       }
//     }
//     return variant
//   })

//   await payload.update({
//     collection: 'products',
//     id: productId,
//     data: { variants: updatedVariants },
//     overrideAccess: true,
//   })
// }

// export async function clearCart() {
//   const { user, cart } = await getUserCart()

//   if (user) {
//     const emptyCart = {
//       ...cart,
//       lineItems: [],
//       discountCode: null,
//       total: 0,
//     }
//     await updateUserCart(emptyCart)
//     window.dispatchEvent(new Event('cartUpdated'))
//     return emptyCart
//   } else {
//     localStorage.removeItem('cart')
//     return { lineItems: [], discountCode: null, total: 0 }
//   }
// }

// export async function getCartItems() {
//   const { cart } = await getUserCart()
//   return cart
// }

// export async function updateUserCart(cart: Cart) {
//   // Recalculate total before updating.
//   const recalculatedTotal = cart.lineItems?.reduce((t: number, item: any) => t + item.linePrice, 0)
//   const updatedCart = { ...cart, total: recalculatedTotal }

//   const { user } = await getUserCart()

//   if (user) {
//     const response = await fetch('/api/base/cart', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       cache: 'no-cache',
//       body: JSON.stringify({ cart: updatedCart }),
//     })
//     return await response.json()
//   }

//   localStorage.setItem('cart', JSON.stringify(updatedCart))
//   return updatedCart
// }

// /**
//  * Add a product to the cart.
//  * This function merges the new line item into the existing cart.
//  * It compares both product and variant using strict equality.
//  */
// export async function addToCart(productId: number, quantity: number, variantId?: string | null) {
//   const productResponse = await fetch(`/api/products/${productId}`)
//   const product: Product = await productResponse.json()

//   const variant = product.variants.find(v => v.id === variantId)
//   if (!variant || !variant.prices.length) {
//     throw new Error('Invalid variant or no prices available')
//   }

//   const price = variant.prices[0].amount / 100 // Convert from cents to whole currency

//   const lineItem = {
//     product: productId,
//     productVariant: variantId || null,
//     quantity,
//     linePrice: price * quantity,
//   }

//   const { cart, user } = await getUserCart()
//   let updatedCart: Cart

//   if (user) {
//     const existingIndex = cart.lineItems?.findIndex(
//       (item: any) => item.product === productId && item.productVariant === (variantId || null),
//     )
//     if (existingIndex !== -1) {
//       const existingItem =
//         existingIndex !== undefined && existingIndex >= 0
//           ? (cart.lineItems ?? [])[existingIndex]
//           : null
//       if (existingItem) {
//         existingItem.quantity += quantity
//         existingItem.linePrice = existingItem.quantity * price
//       }
//     } else {
//       cart.lineItems?.push(lineItem)
//     }
//     updatedCart = await updateUserCart(cart)
//     window.dispatchEvent(new Event('cartUpdated'))
//   } else {
//     let localCart = JSON.parse(localStorage.getItem('cart') || '[]')
//     if (Array.isArray(localCart)) {
//       localCart = {
//         lineItems: localCart,
//         discountCode: null,
//         total: localCart.reduce((t: number, item: any) => t + item.linePrice, 0),
//       }
//     }
//     const existingIndex = localCart.lineItems.findIndex(
//       (item: any) => item.product === productId && item.productVariant === (variantId || null),
//     )
//     if (existingIndex !== -1) {
//       const existingItem = localCart.lineItems[existingIndex]
//       existingItem.quantity += quantity
//       existingItem.linePrice = existingItem.quantity * price
//     } else {
//       localCart.lineItems.push(lineItem)
//     }
//     localCart.total = localCart.lineItems.reduce((t: number, item: any) => t + item.linePrice, 0)
//     localStorage.setItem('cart', JSON.stringify(localCart))
//     window.dispatchEvent(new Event('cartUpdated'))
//     updatedCart = localCart
//   }

//   return updatedCart
// }

// /**
//  * Remove a product from the cart.
//  * This function removes the matching line item completely.
//  */
// export async function removeFromCart(productId: number, variantId?: string | null) {
//   const { cart, user } = await getUserCart()
//   let updatedCart: Cart

//   if (user) {
//     const newLineItems = (cart.lineItems || []).filter(
//       (item: any) =>
//         !(
//           (item.product.id ?? item.product) === productId &&
//           item.productVariant === (variantId || null)
//         ),
//     )
//     cart.lineItems = newLineItems

//     updatedCart = await updateUserCart(cart)
//     window.dispatchEvent(new Event('cartUpdated'))
//   } else {
//     let localCart = JSON.parse(localStorage.getItem('cart') || '[]')
//     if (Array.isArray(localCart)) {
//       localCart = {
//         lineItems: localCart,
//         discountCode: null,
//         total: localCart.reduce((t: number, item: any) => t + item.linePrice, 0),
//       }
//     }
//     localCart.lineItems = localCart.lineItems.filter(
//       (item: any) => !(item.product === productId && item.productVariant === (variantId || null)),
//     )
//     localCart.total = localCart.lineItems.reduce((t: number, item: any) => t + item.linePrice, 0)
//     localStorage.setItem('cart', JSON.stringify(localCart))
//     window.dispatchEvent(new Event('cartUpdated'))
//     updatedCart = localCart
//   }

//   return updatedCart
// }

// export async function mergeCartItems(localLineItems: any[]) {
//   const { user, cart } = await getUserCart()
//   if (user) {
//     const updatedLineItems = [...(cart.lineItems || [])]
//     const processedItems: any[] = []

//     // Process each local item
//     for (const localItem of localLineItems) {
//       const localProductId = Number(localItem.product)
      
//       // Fetch product to get current prices
//       const productResponse = await fetch(`/api/products/${localProductId}`)
//       const product: Product = await productResponse.json()
      
//       // Find the variant
//       const variant = product.variants.find(v => v.id === localItem.productVariant)
//       if (!variant || !variant.prices.length) continue

//       const currentPrice = variant.prices[0].amount / 100 // Convert from cents
      
//       const existingIndex = updatedLineItems.findIndex(
//         (item: any) =>
//           Number(item.product) === localProductId &&
//           item.productVariant === localItem.productVariant,
//       )

//       if (existingIndex !== -1) {
//         const existingItem = updatedLineItems[existingIndex]
//         if (existingItem) {
//           existingItem.quantity += localItem.quantity
//           existingItem.linePrice = currentPrice * existingItem.quantity
//         }
//       } else {
//         processedItems.push({
//           product: localProductId,
//           productVariant: localItem.productVariant,
//           quantity: localItem.quantity,
//           linePrice: currentPrice * localItem.quantity
//         })
//       }
//     }

//     const mergedLineItems = [...updatedLineItems, ...processedItems]
//     const newTotal = mergedLineItems.reduce((t: number, item: any) => t + item.linePrice, 0)
//     const updatedCart = { ...cart, lineItems: mergedLineItems, total: newTotal }
//     const result = await updateUserCart(updatedCart)
//     return result
//   }
//   return null
// }

// /**
//  * After login, merge the local cart into the user's cart.
//  */
// export const mergeCartsAfterLogin = async (userId: number) => {
//   const localCartRaw = localStorage.getItem('cart')
//   if (!localCartRaw) return

//   let localCart
//   try {
//     localCart = JSON.parse(localCartRaw)
//     if (Array.isArray(localCart)) {
//       localCart = {
//         lineItems: localCart,
//         discountCode: null,
//         discountAmount: 0,
//         total: localCart.reduce((t: number, item: any) => t + item.linePrice, 0),
//       }
//     }
//   } catch (e) {
//     console.error('Error parsing local cart:', e)
//     return
//   }

//   if (!localCart.lineItems || localCart.lineItems.length === 0) return

//   const mergedCart = await mergeCartItems(localCart.lineItems)
//   await updateUserCart(mergedCart)
//   localStorage.removeItem('cart')
//   window.dispatchEvent(new Event('cartUpdated'))
//   return mergedCart
// }

// /**
//  * Update the cart with a discount.
//  * discountAmountPercent is assumed to be a percentage value (e.g. 10 for 10% off).
//  */
// export async function updateCartWithDiscount(discountCode: string, discountAmountPercent: number) {
//   const discountFactor = discountAmountPercent / 100
//   const { user, cart } = await getUserCart()

//   if (user) {
//     const originalTotal = cart.lineItems?.reduce((t: number, item: any) => t + item.linePrice, 0)
//     const newTotal = (originalTotal ?? 0) * (1 - discountFactor)
//     const updatedCart = {
//       ...user.cart,
//       discountCode,
//       discountAmount: discountFactor,
//       total: newTotal,
//       lineItems: cart.lineItems,
//     }
//     await fetch(`/api/carts/${user.cart.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedCart),
//     })
//     return updatedCart
//   } else {
//     const localCartRaw = localStorage.getItem('cart')
//     let localCart
//     try {
//       localCart = JSON.parse(localCartRaw || '[]')
//       if (Array.isArray(localCart)) {
//         localCart = {
//           lineItems: localCart,
//           discountCode: null,
//           discountAmount: 0,
//           total: localCart.reduce((t: number, item: any) => t + item.linePrice, 0),
//         }
//       }
//     } catch (e) {
//       localCart = { lineItems: [], discountCode: null, discountAmount: 0, total: 0 }
//     }
//     const originalTotal = localCart.lineItems.reduce(
//       (t: number, item: any) => t + item.linePrice,
//       0,
//     )
//     const newTotal = originalTotal * (1 - discountFactor)
//     const updatedCart = {
//       ...localCart,
//       discountCode,
//       discountAmount: discountFactor,
//       total: newTotal,
//     }
//     localStorage.setItem('cart', JSON.stringify(updatedCart))
//     return updatedCart
//   }
// }
