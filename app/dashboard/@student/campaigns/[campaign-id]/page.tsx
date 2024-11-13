import { AspectRatio, Badge, Box, Container, Flex, Text, Heading, Slider, AlertDialog } from "@radix-ui/themes"
import { Button } from "components/shared"
import { RecentDonations } from "components/ui/dashboard"
import { formatCurrency } from "lib/currency"
import { ArrowLeft, Calendar } from "lucide-react"
import { RoutesMap } from "types/routes"

async function getCampaignDetails(slug: string) {
  return {
    image: "https://via.placeholder.com/240",
    title: "Funds for my Ongoing Bootcamp",
    timeline: {
      current: 21,
      total: 30,
    },
    donations: [
      {
        id: "1",
        amount: 50,
        currency: "USD",
        donatedBy: "John Doe",
        donatedAt: "2 days ago",
      },
      {
        id: "2",
        amount: 100,
        currency: "USD",
        donatedBy: "Jane Doe",
        donatedAt: "3 days ago",
      },
      {
        id: "3",
        amount: 200,
        currency: "USD",
        donatedBy: "John Doe",
        donatedAt: "4 days ago",
      },
    ],
    stats: {
      raised: 1050.99,
      goal: 50000.0,
      currency: "USD",
    },
  } as any
}

async function getCampaignAnalysis(name: string) {
  return {
    score: 0.8,
    sentiment: "positive",
  } as any
}

export default async function Page({
  params,
}: {
  params: {
    campaignId: string
  }
}) {
  const details = await getCampaignDetails(params.campaignId)
  const analysis = await getCampaignAnalysis(details.title)

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
              <img src={details.image} alt={details.title} className="h-full w-full object-cover" />
            </AspectRatio>
            <Flex align="center" gap="3" my="2">
              <Badge size="3" color="green" variant="soft" radius="full">
                <Calendar size={12} />
                <Text size="1" weight="bold">
                  Day {details.timeline.current} of {details.timeline.total}
                </Text>
              </Badge>
              <Text size="1" weight="medium" color="gray">
                {details.timeline.total - details.timeline.current} days left
              </Text>
            </Flex>
          </header>
          <Flex direction="column" gap="4" my="5">
            <Box className="space-y-3 py-3">
              <Heading size="8" weight="medium" className="text-[#333333]">
                {details.title}
              </Heading>
              <Slider
                value={[details.stats.raised]}
                max={details.stats.goal}
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
                  {formatCurrency(details.stats.raised, details.stats.currency)}
                </Text>
              </Flex>
              <Flex direction="column" gap="1" className="flex-1 text-center">
                <Text size="4" weight="bold" className="text-[#999999]">
                  Goal
                </Text>
                <Text size="6" weight="bold">
                  {formatCurrency(details.stats.goal, details.stats.currency)}
                </Text>
              </Flex>
              <Flex direction="column" gap="1" className="flex-1 text-center">
                <Text size="4" weight="bold" className="text-[#999999]">
                  Left
                </Text>
                <Text size="6" weight="bold">
                  {formatCurrency(details.stats.goal - details.stats.raised, details.stats.currency)}
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
          <RecentDonations donations={details.donations || []} />
          {/* Interactions Chart */}
        </aside>
      </Flex>
    </Container>
  )
}
