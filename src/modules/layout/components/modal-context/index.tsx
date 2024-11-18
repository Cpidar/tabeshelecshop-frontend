"use client"

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { toggleModalEventBus } from "./event-bus"

type Context = {
  isOpen: boolean
  toggleModal: () => void
}

const ModalContext = createContext({} as Context)

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setOpen] = useState(false)

  const toggleModal = useCallback(
    () => setOpen((prevState) => (prevState ? false : true)),
    [setOpen]
  )

  useEffect(() => {
    toggleModalEventBus.registerCartAddHandler(toggleModal)
  }, [toggleModal])

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
