import { BehpardakhtErrors } from "@/lib/constants"
import PaymentConfirmation from "@/modules/checkout/templates/payment-confirmation"
import { cookies } from "next/headers"

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

  if (ResCode && (["0", "43"].indexOf(ResCode) === -1)) {
    console.log(`Payment callback ResCode error: ${ResCode}, ${BehpardakhtErrors[ResCode]}`)
    throw new Error(`Payment callback ResCode error: ${ResCode}, ${BehpardakhtErrors[ResCode]}`)
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
