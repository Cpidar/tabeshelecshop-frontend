"use client"

import React, { FormEvent } from "react"
import Input from "@/shared/Input/Input"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import Link from "next/link"
import { logCustomerIn } from "@modules/account/actions"
import { useFormState } from "react-dom"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  phone: string
  email: string
}

const PageLogin = ({ setCurrentView, email, phone }: Props) => {
  const router = useRouter()

  const forgetPassword = async () => {
    const rawFormData = {
      phone,
      email,
      step: "isResetPassword",
    }
    try {
      fetch("http://localhost:9000/store/customers/password-token", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      })
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/send`,
        {
          method: "POST",
          body: JSON.stringify(rawFormData),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        }
      )

      if (response.status === 200) {
        // new customer
        setCurrentView(LOGIN_VIEW.OTP)
      } else {
        // show error
      }
    } catch (e) {
      console.error(e)
    }
  }
  const onSubmit = (_currentState: unknown, formData: FormData) => {
    if (!formData.get("email")) formData.append("email", email)

    logCustomerIn(_currentState, formData)
    router.replace("/")
  }
  const [message, formAction] = useFormState(onSubmit, null)
  return (
    <div className="nc-PageLogin mb-8 p-5 lg:mb-10 flex flex-col items-center lg:justify-center">
      <div className="w-full relative flex items-center justify-center">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="flex right-0 w-6 text-neutral-700 transition-all duration-300 ease-out cursor-pointer fixed lg:absolute"
        >
          <ArrowRightIcon />
        </button>
        <Image
          className="mx-auto h-10 w-auto"
          src={logo}
          width={200}
          height={200}
          alt="Your Company"
        />
      </div>
      <div className="w-full mx-auto space-y-6">
        <h1 className="text-h4 text-neutral-900 text-right w-full mt-6">
          رمز عبور را وارد کنید
        </h1>
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" action={formAction}>
          <label className="block">
            <Input type="hidden" value={email} />
            <Input
              type="password"
              required
              minLength={4}
              className="mt-1"
              name="password"
            />
          </label>
          {message && (
            <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
              {message}
            </p>
          )}
          <ButtonPrimary type="submit">ورود</ButtonPrimary>
        </form>
        <button
          onClick={() => forgetPassword()}
          className="text-sm text-green-600"
        >
          فراموشی رمز عبور
        </button>
      </div>
    </div>
  )
}

export default PageLogin
