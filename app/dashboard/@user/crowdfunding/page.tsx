"use client"

import { Box, Container, Flex, Heading, Tabs } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { Campaign, CampaignProps, CreateCampaignForm } from "components/ui/dashboard"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("all")
  // const campaigns = useQuery("campaigns", () => fetchCampaigns(activeTab))
  const campaigns: CampaignProps[] = []

  return (
    <Container my="5">
      <Flex justify="between" align="center" gap="4">
        <Heading size="7" weight="bold" color="gray">
          Crowdfunding
        </Heading>
        {campaigns.length > 0 && <CreateCampaignForm />}
      </Flex>
      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value)} className="my-5">
        <Tabs.List aria-label="Campaigns" size="2" color="green">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="ended">Ended</Tabs.Trigger>
          <Tabs.Trigger value="in_review">In Review</Tabs.Trigger>
        </Tabs.List>
        <Flex gap="5" py="5" justify="between" align="start">
          <Tabs.Content value={activeTab} className="flex-1 rounded-lg border border-[#0000001A] bg-white py-8">
            {campaigns.length > 0 ? (
              <Flex gap="5" py="8" px="5" height="100%" flexGrow="1">
                {campaigns.map((campaign) => (
                  <Campaign {...campaign} key={campaign.id} />
                ))}
              </Flex>
            ) : (
              <Flex direction="column" align="center" justify="center" className="h-full space-y-4">
                <CampaignsPreview />
                <Heading size="4" weight="regular" className="text-[#777777]">
                  No active campaigns yet
                </Heading>
                <CreateCampaignForm />
              </Flex>
            )}
          </Tabs.Content>
          <aside className="max-w-md"></aside>
        </Flex>
      </Tabs.Root>
    </Container>
  )
}
