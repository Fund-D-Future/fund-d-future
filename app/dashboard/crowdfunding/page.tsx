"use client"

import { Container, Flex, Grid, Heading, Tabs } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { CreateCampaignForm, CampaignCard } from "components/shared"
import { useAuth } from "hooks/use-auth"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Campaign } from "types/campaign"

export default function Page() {
  const [activeTab, setActiveTab] = useState("all")
  const searchParams = useSearchParams()
  const { user, refreshUser } = useAuth()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    // fetch campaigns based on the active tab
    if (user?.campaigns) {
      if (activeTab === "all") {
        setCampaigns(user.campaigns)
      } else {
        setCampaigns(
          user.campaigns.filter((campaign) => {
            // use startDate and endDate to determine the campaign status
            const now = new Date().getTime()
            const startDate = new Date(campaign.startDate).getTime()
            const endDate = new Date(campaign.endDate).getTime()
            if (activeTab === "active") {
              return startDate <= now && endDate >= now
            } else if (activeTab === "ended") {
              return endDate < now
            } else {
              return startDate > now
            }
          })
        )
      }
    }
  }, [user?.campaigns, activeTab])

  const handleNewCampaignCreation = (success: boolean) => {
    if (success) {
      refreshUser()
    }
  }

  const isOpen = searchParams.get("open") == "1"
  return (
    <Container my="5">
      <Flex justify="between" align="center" gap="4" px="3">
        <Heading size="7" weight="bold" color="gray">
          Crowdfunding
        </Heading>
        {campaigns.length > 0 && <CreateCampaignForm defaultOpen={isOpen} onSubmitted={handleNewCampaignCreation} />}
      </Flex>
      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value)} className="my-5">
        <Tabs.List aria-label="Campaigns" size="2" color="green">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="ended">Ended</Tabs.Trigger>
          <Tabs.Trigger value="in_review">In Review</Tabs.Trigger>
        </Tabs.List>
        <Flex gap="5" py="5" justify="between" align="start" direction={{ sm: "column", md: "row" }}>
          <Tabs.Content
            value={activeTab}
            className="flex-1 rounded-lg px-2 py-4 md:border md:border-[#0000001A] md:bg-white md:px-4"
          >
            {campaigns.length > 0 ? (
              <Grid columns="3" gap="3" rows="repeat(2, max-content)" width="auto">
                {campaigns.map((campaign) => (
                  <CampaignCard {...campaign} key={campaign.id} />
                ))}
              </Grid>
            ) : (
              <Flex direction="column" align="center" justify="center" className="h-full space-y-4">
                <CampaignsPreview />
                <Heading size="4" weight="regular" className="text-[#777777]">
                  No active campaigns yet
                </Heading>
                <CreateCampaignForm defaultOpen={isOpen} onSubmitted={handleNewCampaignCreation} />
              </Flex>
            )}
          </Tabs.Content>
          <aside className="max-w-md"></aside>
        </Flex>
      </Tabs.Root>
    </Container>
  )
}
