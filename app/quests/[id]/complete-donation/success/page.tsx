"use client"

import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import { ThumbsUp } from "lucide-react"
import { RoutesMap } from "types/routes"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Flex direction="column" align="center" justify="center" gap="5" className="h-screen bg-green-50">
      <Flex my="5" direction="column" align="center" className="space-y-6 rounded-lg bg-white p-5 text-center">
        <ThumbsUp size={64} color="green" />
        <Heading size="6" weight="bold" align="center">
          Thank You for Supporting a Founder's Journey!
        </Heading>
        <Text as="p" size="4" align="center" className="w-11/12" weight="medium">
          Your contribution has been successfully processed!
          <br />
          You’re making a real difference in a founder’s life. Thank you for investing in the future!
        </Text>
        <Box my="5">
          <Button intent="primary" size="lg" href={RoutesMap.QUEST.replace(":slug", params.id)}>
            Continue to Quest
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
