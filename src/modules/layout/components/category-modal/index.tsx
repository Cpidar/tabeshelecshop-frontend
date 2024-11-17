"use client"

import { SquaresPlusIcon } from "@heroicons/react/24/outline"
import { Drawer } from "vaul"

export default function VaulDrawer({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
        <SquaresPlusIcon className="w-6 h-6" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
