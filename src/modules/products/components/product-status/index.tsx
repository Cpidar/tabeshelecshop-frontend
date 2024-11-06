"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function ProductStatus({
  title,
  endAt,
}: {
  title: string
  endAt: Date | null
}) {
  const calculateTimeLeft = (endDate: Date): TimeLeft => {
    const difference = +new Date(endDate) - +new Date()
    let timeLeft = {} as TimeLeft

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(endAt || new Date())
  )


  useEffect(() => {
    if (endAt) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endAt))
      }, 1000)
      return () => clearTimeout(timer)
    }
  })

  return (
    <>
      {timeLeft.seconds > 0 && (
        <div className="absolute top-4 w-full px-5">
          <div className="flex items-center justify-between pt-0.5 text-red-600">
            <p className="font-semiBold leading-4 text-xs lg:text-[13px] lg:!leading-5 line-clamp-1 max-w-[60%]">
              {title}
            </p>
            {endAt && (
              <time className=" whitespace-nowrap text-base font-semiBold !leading-4 lg:text-base lg:!leading-5">
                {`${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
              </time>
            )}
          </div>
          <div className="relative mt-[3px] lg:mt-[5px] flex h-[3px] w-full justify-end overflow-hidden rounded-[10px] bg-gray-300 lg:h-1">
            <div className="h-[3px] rounded-[10px] lg:h-1 bg-red-600 w-full"></div>
          </div>
        </div>
      )}
    </>
  )
}