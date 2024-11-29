"use client"

import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

type HighlightedBarProps = {
  onClose?: (e: React.SyntheticEvent) => void
  variant?: "dark" | "primary" | "highlighted" | "highlightedTwo"
  children: React.ReactNode
  className?: string
}

const variantBasedClasses = {
  dark: "bg-gray-800",
  primary: "bg-brand",
  highlighted: "bg-yellow-300",
  highlightedTwo: "bg-yellow-200",
}

const HighlightedBar: React.FunctionComponent<HighlightedBarProps> = ({
  variant = "primary",
  children,
  className,
}) => {
  const [isShowing, setIsShowing] = useState(true)

  return (
    <>
      {isShowing && (
        <div
          className={`
        w-full min-h-[40px] py-2 px-4 md:px-6 lg:px-8 flex items-center justify-center relative text-sm text-brand-light 
        ${variantBasedClasses[variant]}
        ${className}
      `}
        >
          {children}
          <button
            onClick={() => setIsShowing(false)}
            aria-label="Close Button"
            className="absolute flex items-center justify-end transition-colors duration-200 rounded-full outline-none w-7 md:w-8 h-7 md:h-8 ltr:right-0 rtl:left-0 ltr:mr-2 rtl:ml-2 md:ltr:mr-3 md:rtl:ml-3 hover:bg-brand-light hover:bg-opacity-10 focus:text-brand-light focus:bg-opacity-10"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}

export default HighlightedBar
