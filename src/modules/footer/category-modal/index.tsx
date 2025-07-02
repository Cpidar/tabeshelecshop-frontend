"use client"

import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { Drawer } from "vaul"
import { useModal } from "../modal-context";

export default function VaulDrawer({
  children,
}: {
  children?: React.ReactNode
}) {
const { isOpen, toggleModal } = useModal()
  return (
    <Drawer.Root dismissible={false} open={isOpen} onOpenChange={toggleModal}>
      <Drawer.Trigger>
        <div className="flex justify-center">
          <SquaresPlusIcon className="w-6 h-6 text-neutral-500" />
        </div>
        {/* <p className="text-xs text-neutral-500">دسته بندی</p> */}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-14 left-0 right-0 outline-none">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
