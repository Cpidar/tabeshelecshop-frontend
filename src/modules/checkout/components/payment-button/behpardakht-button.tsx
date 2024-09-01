"use client"

import { updatePaymentSession } from "@/lib/data"
import { CartWithCheckoutStep } from "@/types/global"
import { Cart, PaymentSession } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { notFound } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export const BehpardakhtPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  notReady: boolean
  "data-testid"?: string
}) => {
  const { t } = useTranslation("common")
  const [data, setData] = useState({} as any)
  const [isLoading, setLoading] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/request`, {
        method: "POST",
        body: JSON.stringify({
          amount: cart.total,
          payerId: cart.shipping_address?.phone || cart.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
  }, [])

  const { refId, resCode } = data
  const session = cart.payment_session as PaymentSession
  let submitting = false

  const handlePayment = () => {
    submitting = true
  }

  const ipgUrl = process.env.BEHPARDAKHT_GATEWAY_URL

  return (
    <>
      <form action={ipgUrl}>
        <input type="hidden" value={refId} id="RefId" name="RefId" />

        <Button
          onClick={handlePayment}
          disabled={notReady}
          isLoading={submitting}
          size="large"
          data-testid="submit-order-button"
        >
          {t("text-place-order")}
        </Button>
        {/* <ErrorMessage error={errorMessage} data-testid="manual-payment-error-message" /> */}
      </form>
    </>
  )
}
