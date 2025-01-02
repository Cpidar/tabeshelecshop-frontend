"use client"

import { Cart, PaymentSession } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import BehpardakhtIcon from "@/shared/Icons/BehpardakhtIcon"
import ErrorMessage from "../error-message"
import Modal from "@modules/common/components/modal"
import Spinner from "@/modules/common/icons/spinner"

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
  // const initialized = useRef(false)
  const formEl = useRef<HTMLFormElement>(null)
  const orderId = Date.now()

  const getRefId = async () => {
    setLoading(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("_medusa_cart_id", cart.id)
    }
    // if (!initialized.current) {
    // initialized.current = true
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/behpardakht/request`,
        {
          method: "POST",
          body: JSON.stringify({
            orderId,
            amount: cart.total! * 10,
            payerId: cart.shipping_address?.phone || cart.email,
          }),
        }
      )

      if (res.status > 399) {
        throw ("مشکلی در اتصال به درگاه پرداخت بوجود آمده است لطفا مجددا تلاش نمایید")
      }

      const data = await res.json()
      formEl.current?.submit()

      setData(data)
      setLoading(false)
    } catch (errorMessage) {
      setLoading(false)
      setData({
        errorMessage,
      })
    }
    // }
  }

  const close = () => {
    setLoading(false)
  }

  const { refId, resCode, errorMessage } = data
  let submitting = false

  const handlePayment = () => {
    submitting = true
  }

  return (
    <>
      {!errorMessage ? (
        <Button
          variant="danger"
          onClick={getRefId}
          disabled={notReady}
          isLoading={isLoading}
          size="xlarge"
          data-testid="submit-order-button"
        >
          <BehpardakhtIcon />
          پرداخت
        </Button>
      ) : (
        <ErrorMessage
          error={errorMessage}
          data-testid="manual-payment-error-message"
        />
      )}

      <Modal isOpen={isLoading} close={close}>
        <form
          ref={formEl}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
        >
          <input type="hidden" value={refId} id="RefId" name="RefId" />
          <div className="flex items-center gap-1">
            <Spinner />
            <span>در حال اتصال به درگاه بانکی</span>
          </div>
        </form>
      </Modal>
    </>
  )
}
