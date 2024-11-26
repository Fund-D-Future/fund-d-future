import { AspectRatio, Badge, Box, Container, Flex, Text, Heading, Slider, Spinner } from "@radix-ui/themes"
import { getUserData } from "app/actions/auth"
import { getCampaignDetails } from "app/actions/campaigns"
import { Button } from "components/shared"
import { CampaignAnalysis, CampaignFunderActions, CampaignOwnerActions } from "components/ui/campaigns"
import { RecentDonations } from "components/ui/dashboard"
import { formatCurrency } from "lib/currency"
import { ArrowLeft, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { RoutesMap } from "types/routes"
import { constructMetadata, dateHandler, mediaMetadataManager } from "utils"

export const metadata = constructMetadata({ title: "FundDFuture | Campaign Details" })

export default async function Page({
  params,
}: {
  params: {
    id: string
  }
}) {
  const details = await getCampaignDetails(params.id)
  if (!details) {
    return notFound()
  }

  const user = await getUserData()

  // Fetch cover media if available
  let coverMedia: React.ReactNode = null
  if (details?.files && details.files.length > 0) {
    coverMedia = await mediaMetadataManager.createMediaElement(details.files[0]!.url)
  }

  // Calculate duration
  const duration = {
    days: dateHandler.getDaysBetween(details.startDate, details.endDate),
    current: dateHandler.getDaysBetween(details.startDate, new Date().toISOString()),
  }

  return (
    <Container py="4" size="4">
      <header className="mx-3 my-5">
        <Button intent="borderless" size="lg" className="justify-start px-0" href={RoutesMap.DASHBOARD}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
      </header>
      <Flex gap="4" direction={{ xs: "column", md: "row" }} justify={{ md: "between" }}>
        <Suspense fallback={<Spinner size="3" />}>
          <Box className="flex-1">
            {/* Campaign Details */}
            <header>
              <AspectRatio ratio={16 / 9} className="w-full bg-slate-100">
                {coverMedia || (
                  <img src="/campaign-placeholder.jpeg" alt="Campaign Cover" className="h-full w-full object-cover" />
                )}
              </AspectRatio>
              <Flex align="center" gap="3" my="2" mx="3">
                {duration.days > duration.current ? (
                  <>
                    <Badge size="3" color="green" variant="soft" radius="full">
                      <Calendar size={12} />
                      <Text size="1" weight="bold">
                        Day {duration.current} of {duration.days}
                      </Text>
                    </Badge>
                    <Text size="1" weight="medium" color="gray">
                      {duration.days - duration.current} days left
                    </Text>
                  </>
                ) : (
                  <Badge size="3" color="red" variant="soft" radius="full">
                    <Calendar size={12} />
                    <Text size="1" weight="bold">
                      Ended
                    </Text>
                  </Badge>
                )}
              </Flex>
            </header>
            <Flex direction="column" gap="4" my="5" px="3">
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
                />
              </Box>
              <Box className="my-3 space-y-2">
                <Heading size="4" weight="bold" color="gray">
                  Description
                </Heading>
                <Text as="p" size="6" weight="medium">
                  {details.description}
                </Text>
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
              {user?.id === details.owner.id ? (
                <>
                  <CampaignAnalysis
                    isAuthenticated={!!user}
                    data={{
                      name: details.name,
                      description: details.description,
                      target_amount: details.fundingGoal,
                      has_visuals: details.files.length > 0,
                    }}
                  />
                  <CampaignOwnerActions hasEnded={duration.current >= duration.days} />
                </>
              ) : (
                <CampaignFunderActions
                  hasEnded={duration.current >= duration.days}
                  fundingGoal={details.fundingGoal}
                  currency={details.currency}
                />
              )}
            </Flex>
          </Box>
        </Suspense>
        <aside className="flex-1 px-3 md:max-w-[400px]">
          <RecentDonations />
          {/* Interactions Chart */}
        </aside>
      </Flex>
    </Container>
  )
}
