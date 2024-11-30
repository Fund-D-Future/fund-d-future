"use client"

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { Button as InternalButton, WalletBalance, CampaignCard } from "components/shared"
import { ProfileStrength, RewardsList } from "components/ui/dashboard"
import WithdrawalPopup from "components/ui/dashboard/withdrawal"
import { UserContext } from "components/user-provider"
import { CurrencyService } from "lib/currency"
import { Eye, EyeOff, Handshake } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Quest, QuestWallet } from "types/quest"
import { RoutesMap } from "types/routes"
import { dateHandler } from "utils"

export default function Page() {
  const [hideBalance, setHideBalance] = useState(false)
  const { user } = useContext(UserContext)
  const [activeQuests, setActiveQuests] = useState<Quest[]>([])
  const [wallet, setWallet] = useState<QuestWallet>({
    id: "",
    balance: 0,
    currency: "USD",
  })

  useEffect(() => {
    setActiveQuests(
      (user?.campaigns ?? []).filter((campaign) =>
        dateHandler.isWithinDeadline(new Date().toISOString(), campaign.endDate)
      )
    )

    if (user?.campaigns?.length) {
      // this wallet will be used as the ultimatum and every other wallet will be subjected
      // to currency conversion based on this wallet
      const bossWallet = user.campaigns[0]!.wallet
      const wallets = user.campaigns.slice(1).map((campaign) => campaign.wallet) // every other wallet

      // convert every other wallet to the bossWallet currency and update the wallet
      const service = CurrencyService.instantiate()
      for (const wallet of wallets) {
        service.convert(wallet.balance, wallet.currency, bossWallet.currency).then((convertedBalance) => {
          bossWallet.balance += convertedBalance
        })
      }

      setWallet(bossWallet)
    }
  }, [user?.campaigns])

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
          <WalletBalance balance={wallet.balance} currency={wallet.currency} showCurrency hide={hideBalance} />
          <WithdrawalPopup amount={wallet.balance} currency={wallet.currency} />
        </Flex>
      </Box>
      <Container className="mx-3 my-5 min-h-[300px] rounded-lg border border-[#0000001A] bg-white p-5 md:ml-0">
        <header className="flex items-center justify-between gap-5">
          <Text size="3" weight="medium" className="text-[#777777]">
            Active Quests
          </Text>
          {(activeQuests.length ?? 0) > 0 && (
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING + "?new=true"}>
              Create New
            </InternalButton>
          )}
        </header>
        {(activeQuests.length ?? 0) > 0 ? (
          <Flex gap="5" py="5" overflowX="auto">
            {activeQuests.map((quest) => (
              <CampaignCard quest={quest} key={quest.id} />
            ))}
          </Flex>
        ) : (
          <Flex direction="column" align="center" justify="center" className="h-full space-y-2">
            <CampaignsPreview />
            <Text size="3" weight="regular" className="text-[#777777]">
              No active quests yet
            </Text>
            <InternalButton intent="primary" size="sm" href={RoutesMap.CROWDFUNDING + "?new=true"}>
              Create New
            </InternalButton>
          </Flex>
        )}
      </Container>
      <Flex
        direction={{ xs: "column", md: "row" }}
        justify="between"
        gap="4"
        className="my-10 mr-3 min-h-72 bg-transparent px-3 md:px-0"
        wrap="wrap"
      >
        <ProfileStrength value={26} />
        <RewardsList
          rewards={[
            { id: "1", title: "Performance Bonus", amount: 50, currency: "USD", claimed: false, claimLink: "/claim/1" },
          ]}
        />
        {/* <RecentDonations  /> */}
      </Flex>
    </>
  )
}
