"use client"

import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { CampaignsPreview } from "components/icons"
import { Button as InternalButton } from "components/shared"
import {
  CampaignCard,
  ProfileStrength,
  RecentDonations,
  RewardsList,
  UserContext,
  WalletBalance,
} from "components/ui/dashboard"
import { useContext, useState } from "react"
import { RoutesMap } from "types/routes"

export default function Page() {
  return (
    <>
      <Box className=" min-h-80 space-y-10 p-10">
        <header className="space-y-2 text-white">
          <Heading size="6" className="flex items-center gap-2 font-extrabold">
            Welcome to FundDFuture
          </Heading>
          <Text as="p" size="4" weight="medium">
            Ready to start your journey toward helping others achieving their educational dreams?
          </Text>
        </header>
        <Flex gap="3" direction={{ sm: "column", md: "row" }} align="stretch">
          <Card size="2" className="flex-1 rounded-md bg-[#056434] text-white">
            <Text as="p" size="3">
              Total Contributions
            </Text>
            <Heading size="6" weight="bold">
              0.00
            </Heading>
          </Card>
          <Card size="2" className="flex-1 rounded-md border border-[#0000001A] bg-white">
            <Text as="p" size="3">
              Active Campaigns Supported
            </Text>
            <Heading size="6" weight="bold">
              0
            </Heading>
          </Card>
          <Card size="2" className="flex-1 rounded-md border border-[#0000001A] bg-white">
            <Text as="p" size="3">
              Impact Meter
            </Text>
            <Heading size="6" weight="bold">
              0%
            </Heading>
          </Card>
        </Flex>
      </Box>
    </>
  )
}
