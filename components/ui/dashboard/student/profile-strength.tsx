import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import { ArrowRightCircle } from "lucide-react"

const colorized = (value: number) => {
  const bgColor = value < 25 ? "#B20000" : value < 50 ? "#FF8C00" : value < 75 ? "#FFD700" : "#00CF68"
  const color = value < 50 || value >= 75 ? "#FFFFFF" : "#000000"
  return { bgColor, color }
}

export default function ProfileStrength({ value }: { value: number }) {
  const { bgColor, color } = colorized(value)

  return (
    <Flex
      direction="column"
      gap="5"
      justify="between"
      align="start"
      className="rounded-xl bg-[#1F1F1F]"
      flexGrow="1"
      flexShrink="0"
      flexBasis="256px"
    >
      <Heading size="4" color="yellow" weight="bold" className="p-5">
        Profile Strength
      </Heading>
      <div className="flex w-full justify-center gap-1 overflow-x-clip py-4">
        {/* 7 vertical bars with tiny spacing separating them and the middle one with flex-1 as it displays the value */}
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-5 rounded-r-xl`}></div>
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-6 rounded-xl`}></div>
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-8 rounded-xl`}></div>
        <div
          style={{ backgroundColor: bgColor, color }}
          className={`flex h-24 w-10 flex-grow items-center justify-center rounded-lg text-4xl font-extrabold`}
        >
          {value}
        </div>
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-8 rounded-xl`}></div>
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-6 rounded-xl`}></div>
        <div style={{ backgroundColor: bgColor, color }} className={`h-24 w-5 rounded-l-xl`}></div>
      </div>
      <Button intent="borderless" size="lg" className="flex items-center gap-2">
        <Text weight="medium" size="3" className="text-white">
          View Report
        </Text>
        <ArrowRightCircle size={16} color="white" />
      </Button>
    </Flex>
  )
}
