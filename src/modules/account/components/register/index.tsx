"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import logo from "@/images/logo.svg"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  phone: string
}

const Register = ({ setCurrentView, phone }: Props) => {
  const router = useRouter()
  const onFormAction = (_currentState: unknown, formData: FormData) => {
    if (!formData.get("phone")) formData.append("phone", phone)
    if (!formData.get("email")) formData.append("email", `${phone}@tabeshelecshop.ir`)
    signUp(_currentState, formData)
    router.replace("/")
  }

  const [message, formAction] = useFormState(signUp, null)
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
        <h1 className="text-h4 text-neutral-900 text-right w-full mt-6">
          مشخصات خود را وارد نمایید
        </h1>
        <form className="w-full flex flex-col" action={formAction}>
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="نام"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="نام خانوادگی"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
            <Input
              label="ایمیل"
              value={`${phone}@tabeshelecshop.ir`}
              name="email"
              type="email"
              autoComplete="email"
              data-testid="email-input"
              hidden
            />
            <Input
              label="Phone"
              value={phone}
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
              hidden
            />
            <Input
              label="رمز عبور"
              name="password"
              required
              type="password"
              autoComplete="new-password"
              data-testid="password-input"
            />
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
          <SubmitButton className="w-full mt-6" data-testid="register-button">
            ورود
          </SubmitButton>
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
