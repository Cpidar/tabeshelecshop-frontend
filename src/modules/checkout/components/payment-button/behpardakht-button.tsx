"use client"

import { Button } from "@medusajs/ui"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import BehpardakhtIcon from "@/components/Icons/BehpardakhtIcon"
import ErrorMessage from "../error-message"
import { HttpTypes } from "@medusajs/types"
import { initiatePaymentSession } from "@/lib/data/cart"

export const BehpardakhtPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const { t } = useTranslation("common")
  const [data, setData] = useState({} as any)
  const [isLoading, setLoading] = useState(false)
  const initialized = useRef(false)
  const orderId = Date.now()

  useEffect(() => {
    setLoading(true)
    if(typeof window !== 'undefined') {
      localStorage.setItem('_medusa_cart_id', cart.id)
    }
    if (!initialized.current) {
      initialized.current = true
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/request`, {
        method: "POST",
        body: JSON.stringify({
          orderId,
          amount: cart.total!*10,
          payerId: cart.shipping_address?.phone || cart.email,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.resCode === 0) {
            console.log(res)
            setData(res)
            setLoading(false)
          } else {
            setData({
              errorMessage:
                "مشکلی در اتصال به درگاه پرداخت بوجود آمده است لطفا مجددا تلاش نمایید",
            })
          }
        })
    }
  }, [])

  const { refId, resCode, errorMessage } = data
  let submitting = false

  const handlePayment = () => {
    submitting = true
  }

  return (
    <>
      <form action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat">
        <input type="hidden" value={refId} id="RefId" name="RefId" />
        {!errorMessage ? (
          <Button
            variant="danger"
            onClick={handlePayment}
            disabled={notReady}
            isLoading={isLoading}
            size="xlarge"
            data-testid="submit-order-button"
          >
            <BehpardakhtIcon />
            ثبت سفارش
          </Button>
        ) : (
          <ErrorMessage
            error={errorMessage}
            data-testid="manual-payment-error-message"
          />
        )}
      </form>
    </>
  )
}
