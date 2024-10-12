import React, { FormEvent } from "react"
import Input from "@/shared/Input/Input"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { LOGIN_VIEW, Step } from "@/modules/account/templates/login-template"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  setPhone: (phone: string) => void
  setEmail: (email: string) => void
  previousView: LOGIN_VIEW
}

interface IFormInput {
  phone: String
}

const PageLogin = ({ setCurrentView, setPhone, setEmail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      phone: "",
    },
  })

  const { t } = useTranslation("common")
  const step: Step = "isSignUp"

  const onSubmit: SubmitHandler<IFormInput> = async ({ phone }) => {
    "use client"

    const rawFormData = {
      phone,
      step,
    }
    setPhone(phone as string)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/phone/${rawFormData.phone}`,
        {
          method: "GET",
        }
      )
      const { exists, email } = await response.json()
      if (exists) {
        // means customer exist go to password input view
        setCurrentView(LOGIN_VIEW.PASSWORD)
        setPhone(rawFormData.phone as string)
        setEmail(email)
      } else {
        // means new customer go to otp input view
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
      }
    } catch (e) {
      console.error(e)
    }
    // ...
  }
  return (
    <div className="nc-PageLogin mb-8 p-5 lg:mb-10 flex flex-col items-center lg:justify-center">
      <div className="w-full relative flex items-center justify-center">
        <div className="flex right-0 text-neutral-700 transition-all duration-300 ease-out cursor-pointer fixed lg:absolute">
          <ArrowRightIcon />
        </div>
        <Image
          className="mx-auto h-10 w-auto"
          src={logo}
          width={200}
          height={200}
          alt="Your Company"
        />
      </div>
      <div className="w-full mx-auto space-y-6">
        <div className="w-full">
          <h1 className="text-h4 text-neutral-900 text-right w-full mt-4">
            ورود | ثبت نام
          </h1>
          <p className="text-xs text-neutral-700 mt-4 text-right w-full">
            سلام!
          </p>
          <p className="text-xs text-neutral-700 mb-4 text-right w-full">
            لطفا شماره موبایل خود را وارد کنید
          </p>
          {/* FORM */}
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <label className="block w-full">
              <Input
                type="number"
                placeholder="09123456789"
                className="text-left mt-1"
                {...register("phone", {
                  required: "enter your phone number",
                  pattern: {
                    value: /((0?9)|(\+?989))\d{9}/g,
                    message: "شماره تلفن بدرستی وارد نشده است",
                  },
                })}
              />
            </label>
            {errors.phone?.message && (
              <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
                {t(errors.phone.message)}
              </p>
            )}
            <ButtonPrimary className="w-full mt-6 lg:mt-8" type="submit">
              {t("text-continue")}
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
