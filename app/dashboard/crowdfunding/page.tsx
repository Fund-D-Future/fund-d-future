"use client"

import { Container, Flex, Grid, Heading, Tabs, Text } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { CreateCampaignForm, CampaignCard } from "components/shared"
import { useAuth } from "hooks/use-auth"
import { useEffect, useState } from "react"
import { Quest } from "types/quest"

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState("all")
  const { user, refreshUser } = useAuth()
  const [quests, setQuests] = useState<Quest[]>([])
  const [isOpen, setIsOpen] = useState(searchParams?.new === "true")

  useEffect(() => {
    // fetch campaigns based on the active tab
    if (user?.campaigns) {
      if (activeTab === "all") {
        setQuests(user.campaigns)
      } else {
        setQuests(
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
      if (isOpen) {
        setIsOpen(false)
      }
    }
  }

  return (
    <Container my="5">
      <Flex justify="between" align="center" gap="4" px="3">
        <Heading size="7" weight="bold" color="gray">
          Crowdfunding
        </Heading>
        {quests.length > 0 && <CreateCampaignForm defaultOpen={isOpen} onSubmitted={handleNewCampaignCreation} />}
      </Flex>
      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value)} className="my-5">
        <Tabs.List aria-label="Campaigns" size="2" color="green">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="ended">Ended</Tabs.Trigger>
          <Tabs.Trigger value="in_review">In Review</Tabs.Trigger>
        </Tabs.List>
        <Flex gap="5" py="5" justify="between" align="start" direction={{ initial: "column", xs: "column", lg: "row" }}>
          <Tabs.Content
            value={activeTab}
            className="flex-1 rounded-lg px-2 py-4 md:border md:border-[#0000001A] md:bg-white md:px-4"
          >
            {quests.length > 0 ? (
              <Flex direction={{ xs: "column", sm: "row" }} wrap="wrap" gap="3" width="auto">
                {quests.map((quest) => (
                  <CampaignCard quest={quest} fillWidth key={quest.id} />
                ))}
              </Flex>
            ) : (
              <Flex direction="column" align="center" justify="center" className="h-full space-y-4">
                <CampaignsPreview />
                <Heading size="4" weight="regular" className="text-[#777777]">
                  No active quests yet
                </Heading>
                <CreateCampaignForm defaultOpen={isOpen} onSubmitted={handleNewCampaignCreation} />
              </Flex>
            )}
          </Tabs.Content>
          <aside className="w-full flex-grow-0 md:max-w-sm">
            {/* Interaction Chart */}
            <div className="w-full space-y-5 rounded-lg border border-[#0000001A] bg-white p-5">
              <Heading size="3" weight="bold" className="text-[#777777]">
                Interactions Chart
              </Heading>
              <Text as="p" size="2" weight="regular" className="text-[#777777]">
                Coming soon...
              </Text>
            </div>
          </aside>
        </Flex>
      </Tabs.Root>
    </Container>
  )
}
