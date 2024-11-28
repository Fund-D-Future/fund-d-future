"use client"

import { Badge, Card, Flex, Heading, Inset, Link, Slider, Text } from "@radix-ui/themes"
import { formatCurrency } from "lib/currency"
import { type Quest } from "types/quest"
import { dateHandler, mediaMetadataManager } from "utils"
import { RoutesMap } from "types/routes"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function QuestCard({ quest, fillWidth }: { quest: Quest; fillWidth?: boolean }) {
  const [coverMedia, setCoverMedia] = useState<React.ReactNode | null>(null)
  const router = useRouter()

  const goToQuest = () => {
    router.push(RoutesMap.QUESTS + `/${quest.id}`)
  }

  useEffect(() => {
    if (quest.files.length > 0) {
      mediaMetadataManager.createMediaElement(quest.files[0]!.url).then((media) => {
        setCoverMedia(media)
      })
    }
  }, [quest.files])

  return (
    <Card
      size="2"
      className={`relative min-w-72 cursor-pointer rounded-full border border-[#0000000D] bg-white ${
        fillWidth ? "flex-1" : "max-w-80"
      }`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={goToQuest}
    >
      <Inset clip="border-box" side="top">
        {coverMedia || (
          <img src="/campaign-placeholder.jpeg" alt="Quest Cover" className="h-full w-full object-cover" />
        )}
      </Inset>
      <Badge
        radius="full"
        style={{ color: "#777777", backgroundColor: "white" }}
        className="absolute left-3 top-3 p-2 text-lg uppercase"
        size="3"
      >
        {/* Calculate days left using start and end date */}
        {dateHandler.getDaysBetween(quest.startDate, quest.endDate)}
        days left
      </Badge>
      <Flex direction="column" gap="5" py="3">
        <Heading size="5" weight="bold">
          {quest.name}
        </Heading>
        <Slider
          max={quest.fundingGoal}
          size="3"
          color="green"
          value={[quest.raisedFunding]}
          className="appearance-none"
        />
      </Flex>
      {/* Quest description if any */}
      <Text as="div" size="2" className="my-1 line-clamp-2 text-ellipsis text-[#777777]">
        {quest.description}
      </Text>
      <Inset clip="border-box" side="bottom" mt="4">
        <Flex justify="between" align="center" gap="5" className="px-3 py-5" style={{ backgroundColor: "#CBEAD240" }}>
          <Flex direction="column" gap="1" className="flex-1 text-center">
            <Text size="2" weight="medium" className="text-[#777777]">
              Raised
            </Text>
            <Text size="3" weight="bold">
              {formatCurrency(quest.raisedFunding, quest.currency)}
            </Text>
          </Flex>
          <Flex direction="column" gap="1" className="flex-1 text-center">
            <Text size="2" weight="medium" className="text-[#777777]">
              Goal
            </Text>
            <Text size="3" weight="bold">
              {formatCurrency(quest.fundingGoal, quest.currency)}
            </Text>
          </Flex>
          <Flex direction="column" gap="1" className="flex-1 text-center">
            <Text size="2" weight="medium" className="text-[#777777]">
              Left
            </Text>
            <Text size="3" weight="bold">
              {formatCurrency(quest.fundingGoal - quest.raisedFunding, quest.currency)}
            </Text>
          </Flex>
        </Flex>
      </Inset>
    </Card>
  )
}
