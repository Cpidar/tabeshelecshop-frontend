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

  const cart = await placeOrder().catch((e) => {
    console.error(e)
    errorMessage = "متاسفانه مشکلی در ثبت سفارش شما پدید آمده است"
    throw new Error("Place Order Error")
  })
  return { errorMessage, cart }
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
    console.log(ResCode)
    throw new Error("ResCode error")
  }

  const providerId = "behpardakht"
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  await updatePaymentSession({
    cartId,
    providerId,
    data: { data: { SaleReferenceId, RefId } },
  }).catch((e) => {
    console.error(e)
    throw new Error("Payment Session not Updated")
  })

  const { errorMessage, cart } = await handleOrder({
    SaleOrderId,
    SaleReferenceId,
    RefId,
  })

  console.log(cart)
  
  return (
    <PaymentConfirmation
      transactionId={searchParams.SaleReferenceId}
      errorMessage={errorMessage}
    />
  )
}
