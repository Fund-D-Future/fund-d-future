"use client"

import { Text } from "@radix-ui/themes"
import { useEffect, useState } from "react"

type CountdownProps = {
  time: number
  action?: "pause" | "resume" | "stop"
  onEnd?: () => void | Promise<void>
  weight?: "regular" | "medium" | "bold"
}

/**
 * Countdown component that takes a time in seconds and a callback function to be called when the countdown ends.
 * @description It will render a countdown timer using the format `[days]:[hours]:[minutes]:seconds` where days, hours, and minutes
 * will only be displayed if they are greater than 0.
 *
 * @param {CountdownProps} props - The props for the Countdown component.
 */
import { useRef } from "react"

export default function Countdown({ time, onEnd, weight, action = "pause" }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState(time)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (action === "pause") {
      setIsPaused(true)
    } else if (action === "resume") {
      setIsPaused(false)
    } else if (action === "stop") {
      setRemainingTime(0)
      setIsPaused(true)
    }
  }, [action])

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!)
          onEnd?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current!)
  }, [isPaused])

  const days = Math.floor(remainingTime / (60 * 60 * 24))
  const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60)
  const seconds = remainingTime % 60

  return (
    <Text weight={weight}>
      {days > 0 && `${days}:`}
      {hours > 0 && `${hours}:`}
      {minutes > 0 ? `${minutes}:` : "00:"}
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  )
}
