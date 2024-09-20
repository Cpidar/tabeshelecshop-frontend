import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { placeOrder } from "@modules/checkout/actions"
import { notFound } from "next/navigation"

const handleOrder = async ({ searchParams }: Props) => {
  let errorMessage = ""

  const verifyRes = await fetch(`http://localhost:8000/api/behpardakht/verify`, {
    method: "POST",
    body: JSON.stringify(searchParams),
  }).then((res) => res.json())

  if (verifyRes.resCode !== (0 || 43)) return verifyRes

  await placeOrder().catch(
    () => (errorMessage = "متاسفانه مشکلی در ثبت سفارش شما پدید آمده است")
  )
  return { errorMessage }
}

type Props = {
  searchParams: {
    orderId: string
    saleOrderId: string
    saleReferenceId: string
  }
}

export default async function OrderConfirmedPage({ searchParams }: Props) {
  const { errorMessage } = await handleOrder({ searchParams })

  return (
    <PaymentConfirmation
      transactionId={searchParams.saleReferenceId}
      errorMessage={errorMessage}
    />
  )
}
