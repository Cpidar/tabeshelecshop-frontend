import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { placeOrder } from "@modules/checkout/actions"
import { notFound } from "next/navigation"

const handleOrder = async ({ params }: Props) => {
  let errorMessage = ""
  const verifyRes = await fetch("/api/behpardakht/verify", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((res) => res.json())

  if (verifyRes.resCode !== (0 || 43)) return verifyRes

  await placeOrder().catch(
    () => (errorMessage = "متاسفانه مشکلی در ثبت سفارش شما پدید آمده است")
  )
  return { errorMessage }
}

type Props = {
  params: {
    orderId: string
    saleOrderId: string
    saleReferenceId: string
  }
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { errorMessage } = await handleOrder({ params })

  return (
    <PaymentConfirmation
      transactionId={params.saleReferenceId}
      errorMessage={errorMessage}
    />
  )
}
