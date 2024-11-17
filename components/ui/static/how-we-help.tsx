"use client"

import { Flex, Heading, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import HowWeHelpStudents from "./how-we-help-students"
import { useState } from "react"
import HowWeHelpFunders from "./how-we-help-funders"

export default function HowWeHelp() {
  const [isStudent, setIsStudent] = useState(true)

  return (
    <Flex direction="column" align="center" gap="8" className="radial-gradient-overlay py-10">
      <Flex direction="column" align="center" gap="4">
        <Heading size="5" weight="bold">
          How can we help you?
        </Heading>
        <Text size="4" className="max-w-screen-sm text-center">
          Our platform connects students with passionate funders who believe in the power of learning.
        </Text>
        <Flex p="3" gap="2" className="rounded-full bg-[#00CF681A]">
          <Button intent={isStudent ? "primary" : "borderless"} size="lg" onClick={() => setIsStudent(true)}>
            For Students
          </Button>
          <Button intent={isStudent ? "borderless" : "primary"} size="lg" onClick={() => setIsStudent(false)}>
            For Funders
          </Button>
        </Flex>
        {isStudent ? <HowWeHelpStudents /> : <HowWeHelpFunders />}
      </Flex>
    </Flex>
  )
}
