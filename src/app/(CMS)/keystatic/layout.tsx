import { Metadata } from "next"
import KeystaticApp from "./keystatic"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Layout() {
  // const customer = await getCustomer()
  // if (customer?.email !== process.env.ADMIN_EMAIL) {
  //   redirect("/auth")
  // }
  return <KeystaticApp />
}
