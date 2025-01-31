import { BehpardakhtErrors } from "@/lib/constants"
import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { cookies } from "next/headers"

type Props = {
  searchParams: Promise<{
    cartId?: string
    ResCode?: string
    RefId: string
    SaleOrderId: string
    SaleReferenceId: string
  }>
}

export default async function OrderConfirmedPage(props: Props) {
  const searchParams = await props.searchParams;
  const { SaleOrderId, SaleReferenceId, RefId, ResCode } = searchParams

  const providerId = "behpardakht"
  const cartId = (await cookies()).get("_medusa_cart_id")?.value

  if (ResCode && (["0", "43"].indexOf(ResCode) === -1)) {
    console.log(ResCode, BehpardakhtErrors[ResCode])
    throw new Error("Payment ResCode error")
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
