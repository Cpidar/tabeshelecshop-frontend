"use client"

import logo from "@/images/logo.svg"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { useEffect, useState } from "react"
import { error } from "console"
import ErrorMessage from "../../components/error-message"

type Props = {
  transactionId: string
  errorMessage: string
}

const PaymentConfirmation = ({ transactionId, errorMessage }: Props) => {
  const [counter, setCounter] = useState(10)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

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
            شماره پیگیری: {transactionId}
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
