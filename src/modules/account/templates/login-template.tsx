"use client"

import { useEffect, useRef, useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import OTP from "@modules/account/components/otp"
import Password from "@modules/account/components/password"
import ResetPassword from "@modules/account/components/reset-password"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  OTP = "otp",
  PASSWORD = "password",
  RESET_PASSWORD = "reset_password",
}

export type Step = "isResetPassword" | "isSignUp"

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")

  const prevViewRef = useRef<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  useEffect(() => {
    prevViewRef.current = currentView
  }, [currentView])

  let componentToRender
  switch (currentView) {
    case LOGIN_VIEW.SIGN_IN:
      componentToRender = (
        <Login
          setEmail={setEmail}
          setPhone={setPhone}
          setCurrentView={setCurrentView}
          previousView={prevViewRef.current}
        />
      )
      break
    case LOGIN_VIEW.OTP:
      componentToRender = (
        <OTP
          previousView={prevViewRef.current}
          phone={phone}
          setCurrentView={setCurrentView}
          setToken={setToken}
        />
      )
      break
    case LOGIN_VIEW.PASSWORD:
      componentToRender = (
        <Password phone={phone} email={email} setCurrentView={setCurrentView} />
      )
      break
    case LOGIN_VIEW.REGISTER:
      componentToRender = (
        <Register phone={phone} setCurrentView={setCurrentView} />
      )
      break
    case LOGIN_VIEW.RESET_PASSWORD:
      componentToRender = (
        <ResetPassword
          token={token}
          email={email}
          setCurrentView={setCurrentView}
        />
      )
      break
  }

  return <>{componentToRender}</>
}

export default LoginTemplate
