"use client"

import { useActionState, useState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerWithPhone, signup } from "@lib/data/customer"
import { SubmitHandler, useForm } from "react-hook-form"
import React from "react"
import { IFormInput } from "../login"
import ButtonPrimary from "@/components/Button/ButtonPrimary"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  phone: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

const Register = ({ setCurrentView, phone }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>()

  const [submit_error, setSubmitError] = useState<string | null>(null)
  const [submit_success, setSubmitSuccess] = useState(false)
  const router = useRouter()

  // const onFormAction = (_currentState: unknown, formData: FormData) => {

  //   if (!formData.get("phone")) formData.append("phone", phone)
  //   if (!formData.get("email"))
  //     formData.append("email", `${phone}@tabeshelecshop.ir`)
  //   signup(_currentState, formData)
  //   router.replace("/")
  // }

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, phone, email, password } = data
    setSubmitError(null)
    setSubmitSuccess(false)
    let errorMsg = null
    try {
      const response = await registerWithPhone({
        firstName,
        lastName,
        phone,
        email,
        password,
      })

      if (
        typeof response === "string" ||
        !response.location ||
        response.location !== "otp"
      ) {
        setSubmitError(response || errorMsg)
        return
      }

      setCurrentView(LOGIN_VIEW.OTP)
    } catch (err: any) {
      setSubmitError(
        err?.message || "An unexpected error occurred. Please try again."
      )
    }
  }

  const [message, formAction] = useActionState(signup, null)
  return (
    <div className="nc-PageLogin mb-8 p-5 lg:mb-10 flex flex-col items-center lg:justify-center">
      <div className="w-full relative flex items-center justify-center">
        <Image
          className="mx-auto h-10 w-auto"
          src={logo}
          width={200}
          height={200}
          alt="Your Company"
        />
      </div>
      <div className="w-full mx-auto space-y-6">
        {submit_success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Registration successful! Welcome aboard.
          </div>
        )}

        {submit_error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submit_error}
          </div>
        )}
        <h1 className="text-h4 text-neutral-900 text-right w-full mt-6">
          مشخصات خود را وارد نمایید
        </h1>
        <form
          className="w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="نام"
              id="firstName"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
              disabled={isSubmitting}
              errors={errors.firstName}
            />
            <Input
              label="نام خانوادگی"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
              disabled={isSubmitting}
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
            <Input
              label="ایمیل"
              value={`${phone}@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`}
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={isSubmitting}
              autoComplete="email"
              data-testid="email-input"
              hidden
            />
            <Input
              label="Phone"
              value={phone}
              id="phone"
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                  message: "Invalid phone number",
                },
              })}
              disabled={isSubmitting}
              autoComplete="tel"
              data-testid="phone-input"
              hidden
            />
            <Input
              label="رمز عبور"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || "At least one number",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "At least one special character",
                },
              })}
              disabled={isSubmitting}
              required
              autoComplete="new-password"
              data-testid="password-input"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <ErrorMessage error={message} data-testid="register-error" />
          <span className="text-center text-ui-fg-base text-small-regular mt-6">
            ورود شما به معنای پذیرش شرایط{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              تابش الکتریک
            </LocalizedClientLink>{" "}
            و{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              قوانین حریم خصوصی است
            </LocalizedClientLink>
            .
          </span>
          <ButtonPrimary
            className="w-full mt-6 lg:mt-8"
            type="submit"
            loading={isSubmitting}
          >
            ورود
          </ButtonPrimary>
        </form>
        {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Already a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="underline"
          >
            Sign in
          </button>
          .
        </span> */}
      </div>
    </div>
  )
}

export default Register
