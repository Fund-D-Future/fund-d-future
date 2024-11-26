import { Badge, Box, Dialog, Flex, Heading, Skeleton, Text } from "@radix-ui/themes"
import { RadialCircleWithDynamicNumber } from "components/icons"
import { Button } from "components/shared"
import { Grid2x2Plus, X } from "lucide-react"
import { Suspense } from "react"

type CampaignAnalysisResponse = {
  score: number
  recommendations: {
    title: string
    suggestion: string
  }[]
}

type CampaignAnalysisProps = {
  data: Record<string, unknown>
  isAuthenticated: boolean
}

async function getCampaignAnalysis(data: CampaignAnalysisProps["data"]): Promise<CampaignAnalysisResponse | null> {
  try {
    const response = await fetch(`https://funddfuture-ml.onrender.com/analyze_campaign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to fetch campaign analysis")
    }

    return response.json() as Promise<CampaignAnalysisResponse>
  } catch (error) {
    return null
  }
}

export default async function CampaignAnalysis({ data, isAuthenticated }: CampaignAnalysisProps) {
  const analysis = await getCampaignAnalysis(data)
  if (!analysis || !isAuthenticated) {
    return null
  }

  return (
    <Suspense
      fallback={
        <Flex align="center" justify="between" gap="5" className="rounded-lg border border-[#0000001A] bg-white p-2">
          <Text>
            <Skeleton>100%</Skeleton>
          </Text>
          <Skeleton loading>
            <Text size="2" weight="medium">
              Loading analysis...
            </Text>
          </Skeleton>
        </Flex>
      }
    >
      <Flex align="center" justify="between" gap="5" className="rounded-lg border border-[#0000001A] bg-white p-2">
        <Badge
          size="3"
          variant="solid"
          radius="full"
          color={analysis.score >= 75 ? "green" : analysis.score >= 50 ? "yellow" : "red"}
        >
          {analysis.score}%
        </Badge>
        <Text size="2" weight="medium" className="flex-1">
          {analysis.score >= 75
            ? "You have a high chance of getting funded"
            : analysis.score >= 50
            ? "You have a moderate chance of getting funded"
            : "You have a low chance of getting funded"}
        </Text>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button underline intent="borderless" size="sm" className="justify-end py-0 text-[#056434]">
              See how to improve your chances
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size="3">
            <Box className="relative">
              <Dialog.Title>Campaign Score</Dialog.Title>
              <Dialog.Close className="absolute right-2 top-1/2 -translate-y-1/2">
                <X size={24} color="gray" />
              </Dialog.Close>
            </Box>
            <Flex
              direction="column"
              gap="3"
              align="center"
              justify="center"
              p="5"
              my="5"
              className="w-full rounded-lg bg-[#CBEAD240]"
            >
              <RadialCircleWithDynamicNumber value={analysis.score} />
              <Dialog.Description size="3" weight="light" color="gray">
                Your chances of getting funded
              </Dialog.Description>
            </Flex>
            <Box className="space-y-8" mt="5">
              <Heading size="3" weight="bold" color="gray">
                Ways to improve your chances
              </Heading>
              <Flex direction="column" gap="5">
                {analysis.recommendations.map(
                  (recommendation: { title: string; suggestion: string }, index: number) => (
                    <Flex align="start" gap="3" key={index}>
                      <Grid2x2Plus size={24} color="green" />
                      <Box className="flex-1 space-y-2">
                        <Heading size="3" weight="bold">
                          {recommendation.title}
                        </Heading>
                        <Text as="p" size="2" weight="medium" color="gray">
                          {recommendation.suggestion}
                        </Text>
                      </Box>
                    </Flex>
                  )
                )}
              </Flex>
            </Box>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Suspense>
  )
}
