import { Box, Flex, Heading } from "@radix-ui/themes"
import { Button, PasswordField } from "components/shared"
import { isValidHexToken } from "utils"
import { notFound } from "next/navigation"

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <Flex direction="column" gap="8" justify="center" className="mx-auto my-52 max-w-xl">
      {isValidHexToken(searchParams.token ?? "") ? (
        <>
          <Heading as="h2" size="7" weight="bold" align="center">
            Reset your password
          </Heading>
          <form className="w-full space-y-20">
            <Box as="div" className="space-y-10">
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
