"use client"

import React, { useEffect } from "react"

// import Input from "@modules/common/components/input"

import { resetPassword } from "@modules/account/actions"
import { useFormState } from "react-dom"
import { LOGIN_VIEW } from "../../templates/login-template"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import Input from "@/shared/Input/Input"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  token: string
  email: string
}

const ProfileName: React.FC<Props> = ({ token, email }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(resetPassword, {
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
  }, [state])

  return (
    <div
    className="max-w-sm flex flex-col items-center"
    data-testid="register-page"
  >
    <h1 className="text-large-semi uppercase mb-6">
      Become a Medusa Store Member
    </h1>
    <p className="text-center text-base-regular text-ui-fg-base mb-4">
      Create your Medusa Store Member profile, and get access to an enhanced
      shopping experience.
    </p>
    <form className="w-full flex flex-col" action={formAction} onReset={() => clearState()}>
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
      {/* <ErrorMessage error={message} data-testid="register-error" /> */}

      <ButtonPrimary className="w-full mt-6" data-testid="register-button">
        Join
      </ButtonPrimary>
    </form>
  </div>
  )
}

export default ProfileName
