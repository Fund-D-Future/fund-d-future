"use client"

import { Box, Flex, Heading, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO: log to error reporting service
  }, [error])

  return (
    <Flex direction="column" gap="8" p="4" height="100vh" align="center" justify="center">
      <Box className="space-y-2 text-center">
        <Heading size="8" weight="bold" color="green">
          Something went wrong!
        </Heading>
        <Text color="gray" size="6">
          {error.message || "An unexpected error occurred"}
        </Text>
      </Box>
      <Box>
        <Button intent="secondary" size="lg" onClick={reset}>
          Try again
        </Button>
      </Box>
    </Flex>
  )
}
