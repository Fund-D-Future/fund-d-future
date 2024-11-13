import { Badge, Card, Flex, Heading, Inset, Link, Slider, Text } from "@radix-ui/themes"
import { formatCurrency } from "lib/currency"
import { RoutesMap } from "types/routes"

export type CampaignProps = {
  id: string
  title: string
  remainingDays: number
  amountRaised: number
  goal: number
  thumbnail: string
  currency?: string
}

export default function Campaign({
  id,
  title,
  remainingDays,
  amountRaised,
  goal,
  thumbnail,
  currency = "USD",
}: CampaignProps) {
  return (
    <Link href={RoutesMap.CAMPAIGNS + `/${id}`} style={{ color: "#333333" }} className="flex-1">
      <Card
        size="2"
        className="relative h-full min-w-72 rounded-full border border-[#0000000D] bg-white"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Inset clip="border-box" side="top">
          <img src={thumbnail} alt={title} className="h-full max-h-36 w-full object-cover" />
        </Inset>
        <Badge
          radius="full"
          style={{ color: "#777777", backgroundColor: "white" }}
          className="absolute left-3 top-3 p-2 text-lg uppercase"
          size="3"
        >
          {remainingDays} days left
        </Badge>
        <Flex direction="column" gap="5" py="3">
          <Heading size="5" weight="bold">
            {title}
          </Heading>
          <Slider max={goal} size="3" color="green" value={[amountRaised]} />
        </Flex>
        <Inset clip="border-box" side="bottom" mt="4">
          <Flex justify="between" align="center" gap="5" className="px-3 py-5" style={{ backgroundColor: "#CBEAD240" }}>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Raised
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(amountRaised, currency)}
              </Text>
            </Flex>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Goal
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(goal, currency)}
              </Text>
            </Flex>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Left
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(goal - amountRaised, currency)}
              </Text>
            </Flex>
          </Flex>
        </Inset>
      </Card>
    </Link>
  )
}
