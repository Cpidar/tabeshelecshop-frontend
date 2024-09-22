"use client"

import logo from "@/images/logo.svg"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { useEffect, useState } from "react"
import { error } from "console"
import ErrorMessage from "../../components/error-message"
import { placeOrder, updatePaymentSessionStatus } from "../../actions"
import { updatePaymentSession } from "@/lib/data"

type Props = {
  providerId: string
  errorMessage?: string
  cartId: string | undefined
  RefId: string
  SaleOrderId: string
  SaleReferenceId: string
}

const PaymentConfirmation = ({
  providerId,
  cartId,
  RefId,
  SaleOrderId,
  SaleReferenceId,
}: Props) => {
  const [counter, setCounter] = useState(10)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  useEffect(() => {
    const handleOrder = async () => {
      let localCartId
      if (typeof window !== "undefined") {
        localCartId = localStorage.getItem("_medusa_cart_id")!
      }
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

      const res = await fetch(`${baseUrl}/api/behpardakht/verify`, {
        method: "POST",
        body: JSON.stringify({
          RefId,
          SaleOrderId,
          SaleReferenceId,
        }),
      })

      const { errorMessage } = await res.json()

      if (res.status === 400) {
        setErrorMessage(errorMessage)
        throw new Error(errorMessage)
      }

      await placeOrder().catch((e) => {
        console.error(e)
        setErrorMessage("متاسفانه مشکلی در ثبت سفارش شما پدید آمده است")
        throw new Error("Place Order Error")
      })

      await updatePaymentSessionStatus(providerId, {
        SaleReferenceId,
        RefId,
      }).catch((e) => {
        console.error(e)
        setErrorMessage("Payment Session not Updated")
        throw new Error("Payment Session not Updated")
      })
    }

    handleOrder()
  }, [])

  return (
    <div className="nc-PageLogin mb-8 p-5 lg:mb-10 flex flex-col items-center lg:justify-center">
      <div className="w-full relative flex items-center justify-center">
        <div className="flex right-0 text-neutral-700 transition-all duration-300 ease-out cursor-pointer fixed lg:absolute">
          <ArrowRightIcon />
        </div>
        <Image
          className="mx-auto h-8 w-auto"
          src={logo}
          width={200}
          height={200}
          alt="Your Company"
        />
      </div>
      <div className="w-full mx-auto space-y-12">
        <div className="w-full">
          <h1 className="text-2xl text-neutral-900 text-center w-full my-8">
            با تشکر از خرید شما
          </h1>
          <p className="text-lg text-neutral-700 mb-4 text-center w-full">
            شماره پیگیری: {SaleReferenceId}
          </p>
          {!errorMessage ? (
            <form className="">
              <ButtonPrimary
                className="w-full mt-6 lg:mt-8"
                type="submit"
                disabled={true}
                loading={true}
              >
                {`در حال انتقال به سایت ${counter} ثانیه`}
              </ButtonPrimary>
            </form>
          ) : (
            <ErrorMessage
              error={errorMessage}
              data-testid="manual-payment-error-message"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
