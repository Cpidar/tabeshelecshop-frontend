import { Spinner, Trash } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"
import { useState } from "react"


type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

const DeleteButton = ({
  id,
  children,
  className,
  onDelete,
  disabled,
  loading
}: {
  id: string
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
      <Button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={onDelete}
        disabled={disabled}
        size="small"
        variant="transparent"
      >
        {loading ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </Button>
    </div>
  )
}

export default DeleteButton
