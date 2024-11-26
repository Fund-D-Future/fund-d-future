"use client"

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { Button as InternalButton, WalletBalance, CampaignCard } from "components/shared"
import { ProfileStrength, RecentDonations, RewardsList } from "components/ui/dashboard"
import { UserContext } from "components/user-provider"
import { Eye, EyeOff, Handshake } from "lucide-react"
import { useContext, useState } from "react"
import { RoutesMap } from "types/routes"
import { dateHandler } from "utils"

export default function Page() {
  const [hideBalance, setHideBalance] = useState(false)
  const { user } = useContext(UserContext)
  const [activeCampaigns, setActiveCampaigns] = useState(
    (user?.campaigns ?? []).filter((campaign) =>
      dateHandler.isWithinDeadline(new Date().toISOString(), campaign.endDate)
    )
  )

  return (
    <>
      <Box className=" min-h-80 space-y-10 rounded-b-xl bg-[#056434] p-10 md:rounded-xl">
        <header className="space-y-2 text-white">
          <Heading size="6" className="flex items-center gap-2 font-extrabold">
            Hello {user?.firstname} <Handshake color="yellow" />
          </Heading>
          <Text as="p" size="4" weight="medium">
            Let's check in on your campaigns and continue reaching your goals!
          </Text>
        </header>
        <Flex gap="5" align="center" direction="column" className="text-center">
          <Text as="p" weight="medium" size="3" className="flex items-center gap-2 text-white">
            <Text>Wallet Balance</Text>
            <Button variant="ghost" className="flex items-center gap-1" onClick={() => setHideBalance(!hideBalance)}>
              {hideBalance ? <Eye color="white" size={16} /> : <EyeOff color="white" size={16} />}
            </Button>
          </Text>
          <WalletBalance balance={0.569} currency="USD" showCurrency hide={hideBalance} />
          <InternalButton intent="secondary" className="w-40 border-2 border-white text-white" size="lg">
            Withdraw
          </InternalButton>
        </Flex>
      </Box>
      <Container className="my-5 mr-5 min-h-[300px] rounded-lg border border-[#0000001A] bg-white p-5">
        <header className="flex items-center justify-between gap-5">
          <Text size="3" weight="medium" className="text-[#777777]">
            Active Campaigns
          </Text>
          {(user?.campaigns?.length ?? 0) > 0 && (
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING + "?open=1"}>
              Create New
            </InternalButton>
          )}
        </header>
        {(user?.campaigns?.length ?? 0) > 0 ? (
          <Flex gap="5" py="5" overflowX="auto">
            {user!.campaigns.map((campaign) => (
              <CampaignCard {...campaign} key={campaign.id} />
            ))}
          </Flex>
        ) : (
          <Flex direction="column" align="center" justify="center" className="h-full space-y-2">
            <CampaignsPreview />
            <Text size="3" weight="regular" className="text-[#777777]">
              No active campaigns yet
            </Text>
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING + "?open=1"}>
              Create New
            </InternalButton>
          </Flex>
        )}
      </Container>
      <Flex direction="row" justify="between" gap="4" className="my-10 mr-5 min-h-72 bg-transparent" wrap="wrap">
        <ProfileStrength value={26} />
        <RewardsList
          rewards={[
            { id: "1", title: "Performance Bonus", amount: 50, currency: "USD", claimed: false, claimLink: "/claim/1" },
          ]}
        />
        <RecentDonations />
      </Flex>
    </>
  )
}
