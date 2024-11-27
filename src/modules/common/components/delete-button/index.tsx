import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"


type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

const DeleteButton = ({
  children,
  className,
  onDelete,
  disabled,
  loading
}: {
  children?: React.ReactNode
  className?: string
  onDelete: ButtonEvent;
  disabled?: boolean
  loading?: boolean
}) => {

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="text-neutral-950 text-xs shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-full px-2 py-1 hover:bg-neutral-100 min-w-20 flex items-center justify-center"
        onClick={onDelete}
      >
        {loading ? <Spinner /> : "حذف"}
      </button>
    </div>
  )
}

export default DeleteButton
