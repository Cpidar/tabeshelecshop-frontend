import { updatePaymentSession } from "@/lib/data"
import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { placeOrder } from "@modules/checkout/actions"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

type Props = {
  searchParams: {
    cartId?: string
    ResCode?: string
    RefId: string
    SaleOrderId: string
    SaleReferenceId: string
  }
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const { SaleOrderId, SaleReferenceId, RefId, ResCode } = searchParams

  const providerId = "behpardakht"
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (ResCode && +ResCode !== (0 || 43)) {
    console.log(ResCode)
    throw new Error("ResCode error")
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/verify`,
    {
      method: "POST",
      body: JSON.stringify({
        SaleOrderId,
        SaleReferenceId,
      }),
    }
  ).then((res) => res.json())

  if (res.status !== 200 || (res.ResCode && res.ResCode !== (0 || 43))) {
    console.log(ResCode)
    throw new Error("ResCode error")
  }

  return (
    <PaymentConfirmation
      providerId={providerId}
      cartId={cartId}
      SaleReferenceId={SaleReferenceId}
      SaleOrderId={SaleOrderId}
      RefId={RefId}
    />
  )
}
