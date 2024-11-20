"use client"

import { Badge, Card, Flex, Heading, Inset, Link, Slider, Text } from "@radix-ui/themes"
import { formatCurrency } from "lib/currency"
import { type Campaign } from "types/campaign"
import { dateHandler, mediaMetadataManager } from "utils"
import { RoutesMap } from "types/routes"
import { useEffect, useState } from "react"

export default function CampaignCard({
  id,
  name,
  description,
  startDate,
  endDate,
  fundingGoal,
  raisedFunding,
  files,
  currency = "USD",
}: Campaign) {
  const [coverMedia, setCoverMedia] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    if (files.length > 0) {
      mediaMetadataManager.createMediaElement(files[0]!.url).then((media) => {
        setCoverMedia(media)
      })
    }
  }, [files])

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
          {coverMedia || (
            <img src="/campaign-placeholder.jpeg" alt="Campaign Cover" className="h-full w-full object-cover" />
          )}
        </Inset>
        <Badge
          radius="full"
          style={{ color: "#777777", backgroundColor: "white" }}
          className="absolute left-3 top-3 p-2 text-lg uppercase"
          size="3"
        >
          {/* Calculate days left using start and end date */}
          {dateHandler.getDaysBetween(startDate, endDate)}
          days left
        </Badge>
        <Flex direction="column" gap="5" py="3">
          <Heading size="5" weight="bold">
            {name}
          </Heading>
          <Slider max={fundingGoal} size="3" color="green" value={[raisedFunding]} />
        </Flex>
        {/* Campaign description if any */}
        <Text size="3" className="px-3 py-3 text-[#777777]">
          {description}
        </Text>
        <Inset clip="border-box" side="bottom" mt="4">
          <Flex justify="between" align="center" gap="5" className="px-3 py-5" style={{ backgroundColor: "#CBEAD240" }}>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Raised
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(raisedFunding, currency)}
              </Text>
            </Flex>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Goal
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(fundingGoal, currency)}
              </Text>
            </Flex>
            <Flex direction="column" gap="1" className="flex-1 text-center">
              <Text size="2" weight="medium" className="text-[#777777]">
                Left
              </Text>
              <Text size="3" weight="bold">
                {formatCurrency(fundingGoal - raisedFunding, currency)}
              </Text>
            </Flex>
          </Flex>
        </Inset>
      </Card>
    </Link>
  )
}
