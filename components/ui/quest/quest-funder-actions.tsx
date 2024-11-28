"use client"

import { Badge, Box, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { Button, CurrencySelector } from "components/shared"
import { CurrencyService } from "lib/currency"
import { CheckCircle2, X } from "lucide-react"
import { useEffect, useState } from "react"

type CampaignFunderActionsProps = {
  hasEnded: boolean
  fundingGoal: number
  currency: string
}

const service = CurrencyService.instantiate()

export default function CampaignFunderActions({ hasEnded, fundingGoal, currency }: CampaignFunderActionsProps) {
  const [donation, setDonation] = useState({
    amount: 0,
    currency: "USD",
    email: "",
  })
  const [percentage, setPercentage] = useState(0.0)

  useEffect(() => {
    const calculatePercentage = async () => {
      let convertedAmount = donation.amount
      if (donation.currency !== currency) {
        convertedAmount = await service.convert(donation.amount, donation.currency, currency)
      }

      setPercentage((convertedAmount / fundingGoal) * 100)
    }

    calculatePercentage()
  }, [donation, fundingGoal])

  return (
    <Flex direction={{ sm: "column", md: "row" }} align="center" justify="between" gap="5" my="5">
      <Dialog.Root>
        <Dialog.Trigger disabled={hasEnded}>
          <Button intent="primary" size="lg" className="flex-1">
            Fund Quest
          </Button>
        </Dialog.Trigger>
        <Dialog.Content size="3">
          <Box className="relative">
            <Dialog.Title>Donate</Dialog.Title>
            <Dialog.Close className="absolute right-2 top-1/2 -translate-y-1/2">
              <X size={24} color="gray" />
            </Dialog.Close>
          </Box>
          <Flex direction="column" gap="5" justify="between" mt="5">
            <Flex direction="column" gap="3">
              <Box className="space-y-3">
                <Text size="4" weight="medium">
                  Email address
                </Text>
                <TextField.Root
                  placeholder="Enter email here..."
                  name="email"
                  type="email"
                  required
                  radius="small"
                  style={{ outline: "none" }}
                  onChange={(e) => setDonation({ ...donation, email: e.target.value })}
                  className="flex-1"
                  size="3"
                />
              </Box>
              <Box className="space-y-3">
                <Text size="4" weight="medium">
                  How much are you donating?
                </Text>
                <Flex
                  align="end"
                  className="relative flex-1 space-y-2 border-b-2 border-[#00000030]"
                  gap="3"
                  pb="3"
                  mb="3"
                >
                  <TextField.Root
                    placeholder="Enter amount here..."
                    name="amount"
                    type="number"
                    value={donation.amount || ""}
                    onChange={(e) => setDonation({ ...donation, amount: +e.target.value })}
                    required
                    radius="small"
                    style={{ outline: "none", fontSize: "1.5rem", fontWeight: "bold" }}
                    className="flex-1 border-l-4 border-green-500"
                    size="3"
                  />
                  <CurrencySelector
                    value={donation.currency}
                    onChange={(currency) => setDonation({ ...donation, currency })}
                    style={{
                      color: "#333333",
                    }}
                  />
                </Flex>
              </Box>
              <Badge size="3" color="green" variant="soft" radius="full" className="py-2">
                <CheckCircle2 size={24} color="white" fill="green" />
                <Text size="3" weight="medium">
                  You're donating to {percentage.toFixed(2)}% of user goal
                </Text>
              </Badge>
              <Flex gap="5" justify="between" align="center" mt="9">
                <Dialog.Close>
                  <Button intent="borderless" size="lg" className="flex-1 bg-[#00CF681A] text-[#00CF68]">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button intent="primary" size="lg" className="flex-1">
                  Give
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Button intent="secondary" size="lg" className="flex-1" disabled>
        Share
      </Button>
    </Flex>
  )
}
