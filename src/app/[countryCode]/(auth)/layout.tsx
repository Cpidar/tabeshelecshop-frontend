import { Metadata } from "next"
// import "@/fonts/line-awesome-1.3.0/css/line-awesome.css"
import "@/styles/index.scss"
// import "rc-slider/assets/index.css"


export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
      <section className="h-screen flex items-center justify-center bg-no-repeat inset-0 bg-cover bg-[url('/assets/images/bg.png')]">
        <div className="flex-1 sm:mx-auto sm:w-full sm:max-w-[420px]">
          <div
            className="bg-white rounded-lg p-5 border border-neutral-200"
            style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
          >
            {children}
          </div>
        </div>
      </section>
  )
}
