"use client"

import React, { FormEvent, useEffect, useState } from "react"
import Input from "@/components/Input/Input"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import { LOGIN_VIEW, Step } from "@/modules/account/templates/login-template"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowRightIcon } from "lucide-react"
import ButtonSecondary from "@/components/Button/ButtonSecondary"
import SubmitButton from "../submit-button"
import { authenticateWithPhone, verifyOtp } from "@/lib/data/customer"

import { zodResolver } from "@hookform/resolvers/zod"
// import { toast } from "sonner"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "react-toastify"
import { Separator } from "@/components/ui/separator"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  setToken: (token: string) => void
  previousView: LOGIN_VIEW
  phone: string
}

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "کد یک بار مصرف ارسالی بایستی 6 رقم باشد.",
  }),
})

interface IFormInput {
  otp: string
}

const PageLogin = ({
  setCurrentView,
  setToken,
  phone,
  previousView,
}: Props) => {
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const [submitError, setSubmitError] = useState<string | null>(null)

  const [minutes, setMinutes] = useState(3)
  const [seconds, setSeconds] = useState(0)

  const step: Step =
    previousView === LOGIN_VIEW.PASSWORD ? "isResetPassword" : "isSignUp"

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          // fetch(
          //   `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/invalidate`,
          //   {
          //     method: "POST",
          //     body: JSON.stringify({
          //       phone,
          //     }),
          //     headers: {
          //       "content-type": "application/json; charset=utf-8",
          //     },
          //   }
          // )
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  const resendOTP = () => {
    authenticateWithPhone(phone)
    // fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/send`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     phone,
    //   }),
    //   headers: {
    //     "content-type": "application/json; charset=utf-8",
    //   },
    // })
    setMinutes(3)
    setSeconds(0)
  }

  const message =
    step === "isSignUp"
      ? t("new-customer-welcome", { phone })
      : t("forgot-password-helper")

  async function onSubmit({ pin: otp }: z.infer<typeof FormSchema>) {
    setSubmitError(null)
    // const rawFormData = {
    //   phone,
    //   token: otp,
    //   step,
    // }

    // medusa v2 version
    const response = await verifyOtp({
      otp,
      phone,
    })

    if (typeof response === "string") {
      console.log(response.includes("expired"))
      if (response.includes("expired")) {
        setSubmitError("کد وارد شده منقضی شده است")
      } else if (response.includes("Invalid OTP")) {
        setSubmitError("کد وارد شده صحیح نیست")
      } else {
        setSubmitError("یک خطای غیر منتظره رخ داده است")
      }
    }

    // medusa v1 version
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/verify`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(rawFormData),
    //       headers: {
    //         "content-type": "application/json; charset=utf-8",
    //       },
    //     }
    //   )

    //   if (response.status === 200) {
    //     // customer exist go to reset password
    //     const { token } = await response.json()
    //     setToken(token)
    //     setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
    //   } else if (response.status === 401) {
    //     const { message } = await response.json()

    //     setError("otp", {
    //       type: "manual",
    //       message,
    //     })
    //   } else if (response.status === 404) {
    //     // new customer go to register
    //     setCurrentView(LOGIN_VIEW.REGISTER)
    //   }
    // } catch (e) {
    //   console.error(e)
    // }
    // ...
  }

  return (
    <div className="nc-PageLogin mb-8 p-5 lg:mb-10 flex flex-col items-center lg:justify-center">
      <div className="w-full relative flex items-center justify-center">
        <button
          onClick={() => setCurrentView(previousView)}
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
          کد تایید را وارد کنید
        </h1>
        {/* {step === "isSignUp" && (
          <p className="text-xs text-neutral-700 my-4 text-right w-full">{`حساب کاربری با شماره موبایل
        ${phone}
        وجود ندارد. برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید.`}</p>
        )} */}
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-10 mx-auto"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور یکبار مصرف</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup dir="ltr" className="">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        {/* </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup dir="ltr"> */}
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    کد شش رقمی ارسال شده به شماره {phone} را در باکس فوق از چپ
                    به راست وارد نمایید.
                    {submitError && (
                      <span className="block mt-3 text-red-500 text-xs">
                        {submitError}
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonPrimary type="submit">Submit</ButtonPrimary>
          </form>
        </Form>

        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
          {seconds > 0 || minutes > 0 ? (
            <p className="text-xs">
              زمان باقیمانده تا دریافت مجدد کد:{" "}
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <ButtonSecondary
              className="w-full"
              disabled={seconds > 0 || minutes > 0}
              onClick={resendOTP}
            >
              <span className="text-blue-500 text-xs">دریافت مجدد کد</span>
            </ButtonSecondary>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageLogin
