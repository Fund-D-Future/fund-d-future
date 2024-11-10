"use client"

import { Flex, Heading, Spinner, Text, TextField } from "@radix-ui/themes"
import { ArrowLeft, MailCheck, MailQuestion } from "lucide-react"
import { useState, useTransition } from "react"
import { sendResetPasswordLink } from "app/actions/auth"
import { Button } from "components/shared"
import { useRouter } from "next/navigation"

export default function Page() {
  const [hasSentResetLink, setHasSentResetLink] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSendResetLink = async (formData: FormData) => {
    startTransition(() => {
      sendResetPasswordLink(formData)
      setHasSentResetLink(true)
    })
  }

  return (
    <>
      <header className="flex items-center justify-between gap-5">
        <Button intent="borderless" size="lg" onClick={() => router.back()}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
      </header>
      <main className="mx-auto flex min-h-[600px] max-w-2xl flex-col items-center gap-32 px-3">
        {hasSentResetLink ? (
          <Flex direction="column" align="center" gap="9">
            <MailCheck size="4rem" color="green" />
            <section className="space-y-5">
              <Heading as="h2" size="7" weight="bold" align="center">
                We sent you a Password Reset Link!
              </Heading>
              <Text as="p" size="4" weight="medium" color="gray" align="center">
                We've sent a password reset link to your email. Please check your inbox (and spam/junk folder just in
                case) to continue. Follow the link in the email to reset your password and regain access to your
                account. If you don't receive it within a few minutes, you can request a new link below.
              </Text>
            </section>
          </Flex>
        ) : (
          <>
            <Heading as="h2" size="7" weight="bold" align="center">
              Forgot your password?
            </Heading>
            <form className="w-full space-y-16" action={handleSendResetLink}>
              <TextField.Root
                placeholder="Type here"
                name="email"
                type="email"
                required
                variant="soft"
                color="green"
                radius="none"
                style={{ fontSize: "2.5rem", fontWeight: 700, minHeight: "5rem", paddingBlock: "1rem" }}
                className="border-l-6 border-l-[#00CF68] placeholder:text-2xl placeholder:font-bold"
                size="3"
              >
                <TextField.Slot>
                  <MailQuestion size="2.5rem" className="ml-2 text-[#999999]" />
                </TextField.Slot>
              </TextField.Root>
              <Button intent="primary" type="submit" size="lg" className="w-full py-5" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </Button>
            </form>
          </>
        )}
      </main>
    </>
  )
}
