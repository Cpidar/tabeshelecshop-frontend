import { Metadata } from "next"
// import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
import { getCustomer } from "@/lib/data"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
// import "rc-slider/assets/index.css"

export const metadata: Metadata = {
  title: "صفحه ورود",
  description: "به حساب کاربری خود در فروشگاه تابش الکتری وارد شوید.",
}

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get("_medusa_jwt")?.value
  if (token) {
    redirect("/")
  }
  return (
    <section className="h-screen flex items-center justify-center bg-no-repeat inset-0 bg-cover bg-[url('/assets/images/bg.png')]">
      <div className="flex-1 sm:mx-auto sm:w-full sm:max-w-[420px]">
        <div
          className="bg-white rounded-lg p-5 border border-neutral-200"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          {token ?  'در حال انتقال' : children}
        </div>
      </div>
    </section>
  )
}
