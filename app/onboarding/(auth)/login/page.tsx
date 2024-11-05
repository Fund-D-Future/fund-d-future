"use client"

import { Heading, Separator, Spinner, Text, TextField } from "@radix-ui/themes"
import { Google } from "components/icons"
import { Button } from "components/shared"
import { RoutesMap } from "lib/constants"
import { ArrowLeft, ChevronRight, MailQuestion } from "lucide-react"
import { useState, FormEventHandler, useTransition } from "react"

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [isReady, setIsReady] = useState(false)

  const handleReady: FormEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.checkValidity()
    if (value !== isReady) setIsReady(value)
  }

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    startTransition(() => {
      e.preventDefault()
      console.log("Logging in...")
    })
  }

  return (
    <>
      <header className="flex items-center justify-between gap-5">
        <Button intent="borderless" size="lg" href={RoutesMap.ONBOARDING}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
        <Button intent="primary" size="lg" href={RoutesMap.SIGNUP} className="mr-4">
          <span>Signup</span>
          <ChevronRight className="s-6 ml-2" />
        </Button>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-3">
        <div className="w-full">
          <Button
            intent="secondary"
            size="lg"
            href=""
            className="flex w-full items-center gap-3 border-[#999999] text-black"
          >
            <Google />
            <span>Continue with Google</span>
          </Button>
        </div>
        <div className="flex w-full items-center gap-4">
          <Separator orientation="horizontal" color="gray" size="4" />
          <Text size="6" weight="medium">
            OR
          </Text>
          <Separator orientation="horizontal" color="gray" size="4" />
        </div>
        <form className="w-full space-y-20" onSubmit={handleLogin}>
          <Heading as="h2" size="7" weight="bold" align="center">
            Login with your email
          </Heading>
          <TextField.Root
            placeholder="Type here"
            name="email"
            type="email"
            required
            variant="soft"
            color="green"
            onInput={handleReady}
            radius="none"
            style={{ fontSize: "2.5rem", fontWeight: 700, minHeight: "5rem", paddingBlock: "1rem" }}
            className="border-l-6 border-l-[#00CF68] placeholder:text-2xl placeholder:font-bold"
            size="3"
          >
            <TextField.Slot>
              <MailQuestion size="2.5rem" className="s-6 ml-2 text-[#999999]" />
            </TextField.Slot>
          </TextField.Root>
          <Button type="submit" className="w-full py-5" intent="primary" size="lg" disabled={!isReady || isPending}>
            {isPending && <Spinner size="3" />}
            <span>{isPending ? "Logging in..." : "Login"}</span>
          </Button>
        </form>
      </main>
    </>
  )
}
