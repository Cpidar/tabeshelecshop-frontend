"use client"
import { XMark, MagnifyingGlass } from "@medusajs/icons"
import { FormEvent, RefObject, useState } from "react"
import { useRouter } from "next/navigation"

import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper"
import useOnClickOutside from "@/utils/use-click-outside"

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onFocus,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps & {
  onFocus(e: FormEvent): void
}) => {
  const [showBackdrop, setShowBackdrop] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form
      className="relative flex w-full rounded-md"
      action=""
      noValidate
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <label htmlFor={"searchId"} className="flex flex-1 items-center py-0.5">
        <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={placeholder}
          spellCheck={false}
          type="search"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
        />
      </label>

      {/* {value ? ( */}
        <button
          type="button"
          title="Clear search"
          className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none"
        >
          <MagnifyingGlass className="w-[17px] h-[17px] text-brand-dark text-opacity-40" />
        </button>
      {/* ) : (
        <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none">
          <XMark className="w-5 h-5 text-brand-dark text-opacity-40" />
        </span>
      )} */}
    </form>
  )
}

const SearchBox = ({
  onFocus,
}: {
  onFocus(e: FormEvent): void
}) => {
  const router = useRouter()

  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox
              {...props}
              onFocus={(e) => onFocus(e)}
            />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}

export default SearchBox
