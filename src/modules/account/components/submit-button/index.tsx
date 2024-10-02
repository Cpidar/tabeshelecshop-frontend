"use client"

import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode
}) {
  const { pending } = useFormStatus()
  const router = useRouter()
  // useEffect(() => {
  //   if (!pending) {
  //     router.push("/")
  //   }
  // }, [pending])

  return (
    <ButtonPrimary type="submit" loading={pending}>
      {pending ? "در حال ورود" : children}
    </ButtonPrimary>
  )
}
