import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getCart, updatePaymentSession } from "@lib/data"

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  return cart
}

export async function POST(request: Request) {
  const res = await request.json()
  const cartId = cookies().get("_medusa_cart_id")?.value
  // const { orderId } = res.body
  
  // const cart = await fetchCart()

  // if (!cart) {
  //   return null
  // }

  // await updatePaymentSession({ cartId: cart?.id, providerId: 'behpardakht', data: { data: { status: 'completed' } } })
  return Response.json({ res })
}