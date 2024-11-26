import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes"
import { Reward, RewardsPreview } from "components/icons"
import { Button } from "components/shared"
import { formatCurrency } from "lib/currency"

type Reward = {
  id: string
  title: string
  amount: number
  currency: string
  claimed: boolean
  claimLink?: string
}

type RewardsListProps = {
  rewards: Reward[]
}

export default function RewardsList({ rewards }: RewardsListProps) {
  return (
    <Card size="2" className="flex-1 basis-64 border border-[#0000001A] bg-white md:basis-auto">
      <Heading size="6" weight="medium" className="py-1" style={{ color: "#666666" }}>
        Rewards
      </Heading>
      <Separator size="4" color="gray" />
      <Flex direction="column" gap="5" mt="3">
        {rewards.length > 0 ? (
          rewards.map((reward) => (
            <Card className="shadow-sm" key={reward.id}>
              <Flex
                justify={{ md: "between" }}
                align={{ sm: "start", md: "center" }}
                gap="3"
                direction={{
                  sm: "column",
                  md: "row",
                }}
              >
                <Reward />
                <Flex direction="column" gap="2" className="flex-grow">
                  <Heading size="4" weight="bold" className="text-[#333333]">
                    {reward.title}
                  </Heading>
                  <Text size="2" weight="medium" className="text-[#777777]">
                    You have received a bonus of {formatCurrency(reward.amount, reward.currency)}
                  </Text>
                </Flex>
                <Button intent="secondary" disabled={reward.claimed} size="sm" href={reward.claimLink}>
                  {reward.claimed ? "Claimed" : "Claim"}
                </Button>
              </Flex>
            </Card>
          ))
        ) : (
          <>
            <Box className="mx-auto my-5 text-center">
              <RewardsPreview />
            </Box>
            <Text as="p" className="text-center">
              You have no reward yet!
              <br />
              Keep raising funds to earn rewards.
            </Text>
          </>
        )}
      </Flex>
    </Card>
  )
}
