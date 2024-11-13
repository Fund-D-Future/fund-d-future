"use client"

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { Button as InternalButton } from "components/shared"
import {
  Campaign,
  CampaignProps,
  ProfileStrength,
  RecentDonations,
  RewardsList,
  WalletBalance,
} from "components/ui/dashboard"
import { Eye, EyeOff, Handshake } from "lucide-react"
import { useState } from "react"
import { RoutesMap } from "types/routes"
import { User } from "types/user"

const dummyUser = {
  id: "a3e4f5",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  role: "student",
} as User

const dummyCampaigns: (CampaignProps & { id: string; description: string })[] = [
  {
    id: "1",
    title: "Funds for my Ongoing Bootcamp",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 100,
    amountRaised: 50,
    remainingDays: 15,
  },
  {
    id: "2",
    title: "Tution fee for my Post Graduate Diploma",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 200,
    amountRaised: 100,
    remainingDays: 1,
  },
  {
    id: "3",
    title: "Tution fee for my Post Graduate Diploma",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 3200,
    amountRaised: 100,
    remainingDays: 20,
  },
  {
    id: "4",
    title: "Campaign 4",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 400,
    amountRaised: 200,
    remainingDays: 10,
  },
  {
    id: "5",
    title: "Medical Bills",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 500,
    amountRaised: 300,
    remainingDays: 5,
  },
  {
    id: "6",
    title: "Campaign 6",
    description: "This is a campaign description",
    thumbnail: "https://via.placeholder.com/150",
    goal: 600,
    amountRaised: 400,
    remainingDays: 2,
  },
]

export default function Page({
  user = dummyUser,
  campaigns = dummyCampaigns,
}: {
  user?: User
  campaigns?: CampaignProps[]
}) {
  const [hideBalance, setHideBalance] = useState(false)

  return (
    <>
      <Box className=" min-h-80 space-y-10 rounded-b-xl bg-[#056434] p-10 md:rounded-xl">
        <header className="space-y-3 text-white">
          <Heading size="4" className="flex items-center gap-2 font-extrabold">
            Hello {user.firstName} <Handshake color="yellow" />
          </Heading>
          <Text as="p" size="2" weight="medium">
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
          {campaigns.length > 0 && (
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING}>
              Create New
            </InternalButton>
          )}
        </header>
        {campaigns.length > 0 ? (
          <Flex gap="5" py="5" overflowX="auto">
            {dummyCampaigns.map((campaign) => (
              <Campaign {...campaign} key={campaign.id} />
            ))}
          </Flex>
        ) : (
          <Flex direction="column" align="center" justify="center" className="h-full space-y-2">
            <CampaignsPreview />
            <Text size="3" weight="regular" className="text-[#777777]">
              No active campaigns yet
            </Text>
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING}>
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
        <RecentDonations
          donations={[
            {
              id: "1",
              donatedBy: "John Doe",
              amount: 50,
              currency: "USD",
              donatedAt: "2 days ago",
            },
            {
              id: "2",
              donatedBy: "Jane Doe",
              amount: 100,
              currency: "USD",
              donatedAt: "3 days ago",
            },
            {
              id: "3",
              donatedBy: "Anonymous",
              amount: 50,
              currency: "USD",
              donatedAt: "2 days ago",
            },
          ]}
        />
      </Flex>
    </>
  )
}
