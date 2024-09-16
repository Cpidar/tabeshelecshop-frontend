import { updatePaymentSession } from "@/lib/data"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export async function POST(request: Request) {
  const { SaleOrderId, SaleReferenceId, RefId } = await request.json()

  if (!SaleReferenceId) {
    return notFound()
  }

  const providerId = 'behpardakht'
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (cartId) {
    await updatePaymentSession({ cartId, providerId, data: { data: { SaleOrderId, SaleReferenceId, RefId } } })
  }

  redirect(`/behpardakht/confirmation?orderId=${SaleOrderId}&saleOrderId=${SaleOrderId}&saleReferenceId=${SaleReferenceId}`)
}
