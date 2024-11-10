"use client"

import { Heading, Spinner, Text } from "@radix-ui/themes"
import { Button, Countdown } from "components/shared"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [code, setCode] = useState(Array(4).fill(""))

  const handleCodeChange: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void = (index) => (e) => {
    const value = e.target.value
    if (value !== "" && !value.match(/^\d+$/)) return

    setCode((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

    if (index < 3 && value !== "") {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    } else if (index >= 0 && value === "") {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = () => {
    startTransition(() => {
      console.log("Verifying code...")
    })
  }

  return (
    <>
      <header className="flex items-center justify-between gap-5">
        <Button intent="borderless" size="lg" href="" onClick={() => router.back()}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-3">
        <section className="space-y-5 text-center">
          <Heading as="h1" size="8" weight="bold">
            Enter Verification Code
          </Heading>
          <Text as="p" size="7" className="mx-auto max-w-lg text-[#999999]">
            We've sent a 4-digit verification code to your email. Please enter the code below
          </Text>
        </section>
        <section className="mt-10 flex w-full justify-between gap-5">
          {code.map((_, index) => (
            <input
              id={`code-${index}`}
              key={index}
              type="text"
              maxLength={1}
              className=" size-32 rounded-md border border-[#CBEAD226] bg-[#CBEAD226] text-center text-4xl outline-[#CBEAD2]"
              value={code[index]}
              onChange={handleCodeChange(index)}
            />
          ))}
        </section>
        <Text size="5" weight="medium" as="p" className="flex items-center gap-3">
          <span>Didn't receive the code?</span>
          <a href="#" className="font-bold text-green-900">
            Resend in <Countdown time={30} /> seconds
          </a>
        </Text>
        <Button
          intent="primary"
          size="lg"
          className="w-full py-5"
          onClick={handleVerify}
          disabled={code.some((c) => c === "")}
        >
          {isPending && <Spinner />}
          <span>{isPending ? "Verifying..." : "Continue"}</span>
        </Button>
      </main>
    </>
  )
}
