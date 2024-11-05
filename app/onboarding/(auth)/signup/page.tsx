"use client"

import { Heading, Separator, Spinner, Text, TextField } from "@radix-ui/themes"
import createAccount from "app/onboarding/actions"
import { Google } from "components/icons"
import { Button } from "components/shared"
import { RoutesMap } from "lib/constants"
import { ArrowLeft, ChevronRight, MailQuestion } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, FormEventHandler, useEffect, useTransition } from "react"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isReady, setIsReady] = useState(false)

  const role = searchParams.get("role")
  const handleReady: FormEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.checkValidity()
    if (value !== isReady) setIsReady(value)
  }

  const handleSignup = async (formData: FormData) => {
    startTransition(() => createAccount(formData))
  }

  // Redirect to onboarding page if role is not set
  useEffect(() => {
    if (!role) router.push(RoutesMap.ONBOARDING)
  }, [role])

  return (
    <>
      <header className="flex items-center justify-between gap-5">
        <Button intent="borderless" size="lg" href={RoutesMap.ONBOARDING}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
        <Button intent="primary" size="lg" href={RoutesMap.LOGIN} className="mr-4">
          <span>Login</span>
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
        <form className="w-full space-y-20" action={handleSignup}>
          <Heading as="h2" size="7" weight="bold" align="center">
            Get started with your email
          </Heading>
          {/* Add an hidden field that holds the role so that it gets set when the server action is invoked */}
          <input type="hidden" name="role" value={role || undefined} />
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
          <div className="space-y-8">
            <Button type="submit" className="w-full py-5" intent="primary" size="lg" disabled={!isReady || isPending}>
              {isPending && <Spinner />}
              <span>{isPending ? "Signing up..." : "Sign up"}</span>
            </Button>
            <Text size="6" weight="regular" align="center" as="p">
              By clicking sign up, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </div>
        </form>
      </main>
    </>
  )
}
