import { Metadata } from "next"

import { listOrders } from "@lib/data/orders"
import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@/lib/data/customer"

export const metadata: Metadata = {
  title: "حساب کاربری",
  description: "نمای کلی از فعالیت حساب کاربری شما",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  
  if (!customer) {
    notFound()
  }

  return <Overview customer={customer} orders={orders} />
}
