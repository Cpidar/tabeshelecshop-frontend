"use client"
import { useCart } from "@/modules/cart/components/cart-context"
import React, { FC } from "react"

interface BagIconProps {
  className?: string
  color?: string
  width?: number
  height?: number
}

const BagIcon2withBadge: FC<BagIconProps> = ({
  className = "w-5 h-5",
  color = "currentColor",
  width = 22,
  height = 22,
}) => {
  const { cart } = useCart()
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <div className="lg:mr-4 relative inline-block">
      <div className="min-w-[15px] min-h-[15px] absolute -top-2.5 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 ltr:left-2.5 rtl:right-2.5 rounded-sm">
        {totalItems}
      </div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clipPath="url(#clip0)">
          <path
            d="M19.7999 19.0172L18.5402 4.8319C18.5132 4.51697 18.2478 4.27853 17.9374 4.27853H15.3459C15.31 1.91207 13.3754 0 10.9999 0C8.62447 0 6.68991 1.91207 6.65392 4.27853H4.06251C3.74758 4.27853 3.48664 4.51697 3.45965 4.8319L2.19993 19.0172C2.19993 19.0352 2.19543 19.0532 2.19543 19.0712C2.19543 20.6863 3.6756 22 5.49768 22H16.5022C18.3243 22 19.8044 20.6863 19.8044 19.0712C19.8044 19.0532 19.8044 19.0352 19.7999 19.0172ZM10.9999 1.21472C12.705 1.21472 14.0952 2.58241 14.1312 4.27853H7.86864C7.90464 2.58241 9.29482 1.21472 10.9999 1.21472ZM16.5022 20.7853H5.49768C4.35494 20.7853 3.42815 20.0294 3.41016 19.0982L4.61588 5.49775H6.64942V7.34233C6.64942 7.67975 6.91936 7.94969 7.25678 7.94969C7.59421 7.94969 7.86415 7.67975 7.86415 7.34233V5.49775H14.1312V7.34233C14.1312 7.67975 14.4012 7.94969 14.7386 7.94969C15.076 7.94969 15.3459 7.67975 15.3459 7.34233V5.49775H17.3795L18.5897 19.0982C18.5717 20.0294 17.6404 20.7853 16.5022 20.7853Z"
            fill={color}
            stroke={color}
            strokeWidth="0.1"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="22" height="22" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default BagIcon2withBadge
