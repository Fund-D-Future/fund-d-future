import { AspectRatio, Badge, Box, Container, Flex, Text, Heading, Slider, AlertDialog } from "@radix-ui/themes"
import { Button } from "components/shared"
import { RecentDonations } from "components/ui/dashboard"
import { env } from "env.mjs"
import { formatCurrency } from "lib/currency"
import { ArrowLeft, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { Campaign } from "types/campaign"
import { RoutesMap } from "types/routes"
import { dateHandler, mediaMetadataManager } from "utils"
import { createApiClient } from "utils/api"

async function getCampaignDetails(slug: string): Promise<Campaign | null> {
  try {
    const api = await createApiClient()
    const response = await api.fetch(`${env.API_URL}/campaigns/${slug}`)
    if (!response.ok) {
      throw new Error("Failed to fetch campaign details")
    }

    const { body: campaign } = (await response.json()) as { body: Campaign }
    return campaign
  } catch (error) {
    return null
  }
}

async function getCampaignAnalysis(slug: string, text?: string): Promise<any | null> {
  try {
    const response = await fetch(`${env.API_URL}/ai/campaigns/analyse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId: slug, text }),
    })
    if (!response.ok) {
      throw new Error("Failed to fetch campaign analysis")
    }

    const { body: analysis } = (await response.json()) as { body: any }
    return analysis
  } catch (error) {
    return null
  }
}

export default async function Page({
  params,
}: {
  params: {
    campaignId: string
  }
}) {
  const details = await getCampaignDetails(params.campaignId)
  if (!details) {
    return notFound()
  }

  const analysis = await getCampaignAnalysis(params.campaignId, details?.description)
  let coverMedia: React.ReactNode = null
  if (details?.files && details.files.length > 0) {
    coverMedia = await mediaMetadataManager.createMediaElement(details.files[0]!.url)
  }

  const duration = {
    days: dateHandler.getDaysBetween(details.startDate, details.endDate),
    current: dateHandler.getDaysBetween(details.startDate, new Date().toISOString()),
  }

  return (
    <Container py="4">
      <header className="my-5">
        <Button intent="borderless" size="lg" className="justify-start px-0" href={RoutesMap.DASHBOARD}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
      </header>
      <Flex gap="4" direction={{ sm: "column", md: "row" }} justify={{ md: "between" }}>
        <Box className="flex-1">
          {/* Campaign Details */}
          <header>
            <AspectRatio ratio={16 / 9} className="w-full bg-slate-100">
              {coverMedia}
            </AspectRatio>
            <Flex align="center" gap="3" my="2">
              <Badge size="3" color="green" variant="soft" radius="full">
                <Calendar size={12} />
                <Text size="1" weight="bold">
                  Day {duration.current} of {duration.days}
                </Text>
              </Badge>
              <Text size="1" weight="medium" color="gray">
                {duration.days - duration.current} days left
              </Text>
            </Flex>
          </header>
          <Flex direction="column" gap="4" my="5">
            <Box className="space-y-3 py-3">
              <Heading size="8" weight="medium" className="text-[#333333]">
                {details.name}
              </Heading>
              <Slider
                value={[details.raisedFunding]}
                max={details.fundingGoal}
                color="green"
                size="2"
                radius="full"
                highContrast
              />
            </Box>
            <Flex gap="3" justify="between" align="center" className="rounded-lg bg-[#CBEAD240] px-5 py-8">
              <Flex direction="column" gap="1" className="flex-1 text-center">
                <Text size="4" weight="bold" className="text-[#999999]">
                  Raised
                </Text>
                <Text size="6" weight="bold">
                  {formatCurrency(details.raisedFunding, details.currency)}
                </Text>
              </Flex>
              <Flex direction="column" gap="1" className="flex-1 text-center">
                <Text size="4" weight="bold" className="text-[#999999]">
                  Goal
                </Text>
                <Text size="6" weight="bold">
                  {formatCurrency(details.fundingGoal, details.currency)}
                </Text>
              </Flex>
              <Flex direction="column" gap="1" className="flex-1 text-center">
                <Text size="4" weight="bold" className="text-[#999999]">
                  Left
                </Text>
                <Text size="6" weight="bold">
                  {formatCurrency(details.fundingGoal - details.raisedFunding, details.currency)}
                </Text>
              </Flex>
            </Flex>
            <Flex
              align="center"
              justify="between"
              gap="5"
              className="rounded-lg border border-[#0000001A] bg-white p-2"
            >
              <Badge size="3" color="green" variant="solid" radius="full">
                {(analysis.score * 100).toFixed(0)}%
              </Badge>
              <Text size="2" weight="medium" className="flex-1">
                {analysis.sentiment === "positive"
                  ? "You have a high chance of getting funded"
                  : "You have a low chance of getting funded"}
              </Text>
              <Button underline href="" intent="borderless" size="sm" className="justify-end py-0 text-[#056434]">
                See how to improve your chances
              </Button>
            </Flex>
            <Flex align="center" justify="between" gap="5" my="5">
              <Button intent="primary" size="lg" className="flex-1">
                Edit Campaign
              </Button>
              <Button intent="secondary" size="lg" className="flex-1">
                Share
              </Button>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button intent="borderless" size="lg" className="flex-1 bg-[#B20000] text-white">
                    End Campaign
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px" className="space-y-5">
                  <AlertDialog.Title>End this campaign?</AlertDialog.Title>
                  <AlertDialog.Description>
                    Your earnings will be added to your wallet balance and the campaign will be ended. Are you sure you
                    want to continue?
                  </AlertDialog.Description>
                  <Flex gap="3" justify="end" align="center">
                    <AlertDialog.Cancel>
                      <Button color="gray" intent="borderless" size="sm" className="text-[#777777]">
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button intent="borderless" size="sm" className="bg-[#B20000] text-white">
                        End Campaign
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </Flex>
          </Flex>
        </Box>
        <aside className="max-w-[400px] flex-1">
          <RecentDonations />
          {/* Interactions Chart */}
        </aside>
      </Flex>
    </Container>
  )
}
