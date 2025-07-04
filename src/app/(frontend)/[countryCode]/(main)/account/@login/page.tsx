import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "صفحه ورود",
  description: "به حساب کاربری خود در فروشگاه تابش الکتری وارد شوید.",
}

export default function Login() {
  return <LoginTemplate />
}
