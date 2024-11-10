"use client"

import { Box, Heading, Separator, Spinner, Text, TextField } from "@radix-ui/themes"
import { Google } from "components/icons"
import { Button, PasswordField } from "components/shared"
import { RoutesMap } from "types/routes"
import { ArrowLeft, ChevronRight, MailQuestion } from "lucide-react"
import { FormEventHandler, useTransition } from "react"

export default function Page() {
  const [isPending, startTransition] = useTransition()

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    startTransition(() => {
      e.preventDefault()
      console.log(Object.fromEntries(new FormData(e.currentTarget)))
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
          <Box as="div" className="space-y-10">
            <Box className="space-y-3">
              <Text size="4" weight="medium">
                Email address
              </Text>
              <TextField.Root
                placeholder="Enter your email address"
                name="email"
                type="email"
                required
                style={{ backgroundColor: "#FAFAFA" }}
                size="3"
              />
            </Box>
            <PasswordField label="Password" placeholder="Enter your password" />
            <a href={RoutesMap.FORGOT_PASSWORD} className="text-md flex items-center gap-1 text-red-700">
              <MailQuestion size="24" className="mr-2" />
              <span>Forgot password?</span>
            </a>
          </Box>
          <Button type="submit" className="w-full py-5" intent="primary" size="lg" disabled={isPending}>
            {isPending && <Spinner size="3" />}
            <span>{isPending ? "Logging in..." : "Login"}</span>
          </Button>
        </form>
      </main>
    </>
  )
}
