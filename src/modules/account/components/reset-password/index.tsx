"use client"

import React, { useEffect, useState, useActionState } from "react";

import { LOGIN_VIEW } from "../../templates/login-template"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Input from "@/components/Input/Input"
import ErrorMessage from "@/modules/checkout/components/error-message"
import SubmitButton from "../submit-button"
import { resetPassword } from "@/lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  token: string
  email: string
}

const ChangePasswordForm: React.FC<Props> = ({ token, email }) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [successState, setSuccessState] = useState(false)

  const [state, formAction] = useActionState(resetPassword, {
    email,
    token,
    success: false,
    error: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
    if (!successState) {
      setErrorMessage("پسوردها با هم یکسان نیستند")
    }
  }, [state, successState])

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">تغییر رمز عبود</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        لطفا رمز جدید خود را در کادر زیر وارد کنید:
      </p>
      <form
        className="w-full flex flex-col"
        action={formAction}
        onReset={() => clearState()}
      >
        <div className="flex flex-col w-full gap-y-2">
          <Input
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
        {!successState && (
          <ErrorMessage error={errorMessage} data-testid="register-error" />
        )}

        <SubmitButton className="w-full mt-6" data-testid="register-button">
          ذخیره و ورود
        </SubmitButton>
      </form>
    </div>
  )
}

export default ChangePasswordForm
