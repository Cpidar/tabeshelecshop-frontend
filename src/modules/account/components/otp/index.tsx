"use client"

import React, { FormEvent, useEffect, useState } from "react"
import Input from "@/components/Input/Input"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import { LOGIN_VIEW, Step } from "@/modules/account/templates/login-template"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import ButtonSecondary from "@/components/Button/ButtonSecondary"
import SubmitButton from "../submit-button"
type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  setToken: (token: string) => void
  previousView: LOGIN_VIEW
  phone: string
}

interface IFormInput {
  otp: String
}

const PageLogin = ({
  setCurrentView,
  setToken,
  phone,
  previousView,
}: Props) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      otp: "",
    },
  })
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
          fetch(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/invalidate`,
            {
              method: "POST",
              body: JSON.stringify({
                phone,
              }),
              headers: {
                "content-type": "application/json; charset=utf-8",
              },
            }
          )
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
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/send`, {
      method: "POST",
      body: JSON.stringify({
        phone,
      }),
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    })
    setMinutes(3)
    setSeconds(0)
  }

  const message =
    step === "isSignUp"
      ? t("new-customer-welcome", { phone })
      : t("forgot-password-helper")

  const onSubmit: SubmitHandler<IFormInput> = async ({ otp }) => {
    const rawFormData = {
      phone,
      token: otp,
      step,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/verify`,
        {
          method: "POST",
          body: JSON.stringify(rawFormData),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        }
      )

      if (response.status === 200) {
        // customer exist go to reset password
        const { token } = await response.json()
        setToken(token)
        setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
      } else if (response.status === 401) {
        const { message } = await response.json()

        setError("otp", {
          type: "manual",
          message,
        })
      } else if (response.status === 404) {
        // new customer go to register
        setCurrentView(LOGIN_VIEW.REGISTER)
      }
    } catch (e) {
      console.error(e)
    }
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
        {step === "isSignUp" && (
          <p className="text-xs text-neutral-700 my-4 text-right w-full">{`حساب کاربری با شماره موبایل
        ${phone}
        وجود ندارد. برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید.`}</p>
        )}
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            {/* <span className="text-neutral-800 dark:text-neutral-200">
              {t("text-otp-code")}
            </span> */}
            <Input
              type="number"
              // placeholder="example@example.com"
              className="mt-1"
              {...register("otp", {
                required: "enter a valid otp",
                pattern: {
                  value: /\d{6}/gm,
                  message: "enter a valid otp",
                },
              })}
            />
          </label>
          {errors.otp?.message && (
            <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
              {t(errors.otp.message)}
            </p>
          )}
          <SubmitButton>{t("text-verify-code")}</SubmitButton>
        </form>

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
