"use client"

import { updatePaymentSession } from "@/lib/data"
import { CartWithCheckoutStep } from "@/types/global"
import { Cart, PaymentSession } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { notFound } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import BehpardakhtIcon from "@/shared/Icons/BehpardakhtIcon"
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
  const orderId = Date.now()

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/request`, {
        method: "POST",
        body: JSON.stringify({
          orderId,
          amount: cart.total,
          payerId: cart.shipping_address?.phone || cart.email,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setData(res)
          setLoading(false)
          return updatePaymentSession({
            cartId: cart.id,
            providerId: "behpardakht",
            data: { data: { refrenceId: res.refId, orderId } },
          })
        })
    }
  }, [])

  const { refId, resCode } = data
  const session = cart.payment_session as PaymentSession
  let submitting = false

  const handlePayment = () => {
    submitting = true
  }

  return (
    <>
      <form action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat">
        <input type="hidden" value={refId} id="RefId" name="RefId" />

        <Button
          onClick={handlePayment}
          disabled={notReady}
          isLoading={submitting}
          size="large"
          data-testid="submit-order-button"
          className="w-full flex items-center justify-center min-h-[50px] px-5 py-[10px] border transition-colors duration-200 disabled:opacity-50 text-white bg-[#e01132] hover:bg-white hover:text-[#a5a5a5] disabled:hover:bg-gray-900 disabled:hover:text-white"
        >
          <BehpardakhtIcon />
          پرداخت از طریق درگاه به پرداخت بانک ملت
        </Button>
        {/* <ErrorMessage error={errorMessage} data-testid="manual-payment-error-message" /> */}
      </form>
    </>
  )
}
