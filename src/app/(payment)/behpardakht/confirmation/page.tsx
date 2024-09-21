import { updatePaymentSession } from "@/lib/data"
import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { placeOrder } from "@modules/checkout/actions"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

const handleOrder = async ({
  SaleOrderId,
  SaleReferenceId,
  RefId,
}: Props["searchParams"]) => {
  let errorMessage = ""
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
  const res = await fetch(`${baseUrl}/api/behpardakht/verify`, {
    method: "POST",
    body: JSON.stringify({
      RefId,
      SaleOrderId,
      SaleReferenceId,
    }),
  })

  const data = await res.json()

  if (res.status === 400) return data

  await placeOrder().catch(
    () => (errorMessage = "متاسفانه مشکلی در ثبت سفارش شما پدید آمده است")
  )
  return { errorMessage }
}

type Props = {
  searchParams: {
    ResCode?: string
    RefId: string
    SaleOrderId: string
    SaleReferenceId: string
  }
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const { SaleOrderId, SaleReferenceId, RefId, ResCode } = searchParams

  if (ResCode && +ResCode !== 0) {
    return notFound()
  }

  const providerId = "behpardakht"
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return notFound()

  await updatePaymentSession({
    cartId,
    providerId,
    data: { data: { SaleReferenceId, RefId } },
  }).catch(() => notFound())

  const { errorMessage } = await handleOrder({
    SaleOrderId,
    SaleReferenceId,
    RefId,
  })
  return (
    <PaymentConfirmation
      transactionId={searchParams.SaleReferenceId}
      errorMessage={errorMessage}
    />
  )
}
