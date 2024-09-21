import { updatePaymentSession } from "@/lib/data"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export async function POST(request: Request) {
  console.log(request)
  // const resJson = await request.json()
  const resText = await request.text()
  // console.log(resJson)
  console.log(resText)
  return Response.json({ resText })
  // const { SaleOrderId, SaleReferenceId, RefId } = res

  // if (!SaleReferenceId) {
  //   return notFound()
  // }

  // const providerId = 'behpardakht'
  // const cartId = cookies().get("_medusa_cart_id")?.value

  // if (cartId) {
  //   await updatePaymentSession({ cartId, providerId, data: { data: { SaleOrderId, SaleReferenceId, RefId } } })
  // }

  // redirect(`/behpardakht/confirmation?orderId=${SaleOrderId}&saleOrderId=${SaleOrderId}&saleReferenceId=${SaleReferenceId}`)
}
