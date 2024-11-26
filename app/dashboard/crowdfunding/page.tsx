"use client"

import { Container, Flex, Grid, Heading, Tabs } from "@radix-ui/themes"
import { fetchCampaigns } from "app/actions/campaigns"
import { CampaignsPreview } from "components/icons"
import { CreateCampaignForm, CampaignCard } from "components/shared"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Campaign } from "types/campaign"

export default function Page() {
  const [activeTab, setActiveTab] = useState("all")
  const searchParams = useSearchParams()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    // fetch campaigns based on the active tab
    fetchCampaigns(
      new URLSearchParams({
        status: activeTab,
        page: searchParams.get("page") || "1",
        limit: searchParams.get("limit") || "50",
      })
    ).then((data) => {
      setCampaigns(data)
    })
  }, [])

  const handleNewCampaignCreation = (campaign: Campaign) => {
    setCampaigns((prev) => [campaign, ...prev])
  }

  const isOpen = searchParams.get("open") == "1"
  return (
    <Container my="5">
      <Flex justify="between" align="center" gap="4">
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
            className="flex-1 rounded-lg bg-white py-4 md:border md:border-[#0000001A] md:px-4"
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
