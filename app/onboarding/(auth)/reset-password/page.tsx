"use client"

import { Box, Flex, Heading, Text } from "@radix-ui/themes"
import { Button, PasswordField } from "components/shared"
import { notFound } from "next/navigation"
import { useNotificationStore } from "lib/stores/notification-store"
import { resetPassword } from "app/actions/auth"
import useBrowserStorage from "hooks/use-browser-storage"

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const { addNotification } = useNotificationStore()
  const { state } = useBrowserStorage<{ email: string }>("fdf-fp-email")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries()) as { password: string; confirmPassword: string }

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      await resetPassword({
        password: data.password,
        token: searchParams.token!,
        email: state!.email,
      })
      addNotification("success", "Password reset successful")
    } catch (error) {
      addNotification("error", (error as Error).message)
    }
  }

  return (
    <Flex direction="column" gap="8" justify="center" className="mx-auto my-52 max-w-xl">
      {searchParams.token ? (
        <>
          <Heading as="h2" size="7" weight="bold" align="center">
            Reset your password
          </Heading>
          <form className="w-full space-y-20" onSubmit={handleSubmit}>
            <Box as="div" className="space-y-10">
              <Box as="div" className="space-y-4">
                <Text as="p" size="4" weight="medium">
                  Your Email Address: <strong className="font-extrabold text-green-600">{state?.email}</strong>
                </Text>
              </Box>
              <PasswordField placeholder="Enter your preferred password" label="New Password" />
              <PasswordField placeholder="Re-enter your password" label="Confirm Password" name="confirmPassword" />
            </Box>
            <Button type="submit" intent="primary" size="lg" className="w-full">
              Reset Password
            </Button>
          </form>
        </>
      ) : (
        notFound()
      )}
    </Flex>
  )
}
