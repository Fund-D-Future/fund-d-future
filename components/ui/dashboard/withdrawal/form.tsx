"use client"

import { Box, Callout, Flex, Select, Text, TextField } from "@radix-ui/themes"
import { withdrawAmount } from "app/actions/quests"
import { Button } from "components/shared"
import { useAuth } from "hooks/use-auth"
import useBanks from "hooks/use-banks"
import { CurrencyService } from "lib/currency"
import { useNotificationStore } from "lib/stores/notification-store"
import { Info } from "lucide-react"

export type WithdrawalFormProps = {
  amount: number
  currency: string
  children?: React.ReactNode
  onWithdraw?: () => void
}

export default function WithdrawalForm({ amount, currency, children, onWithdraw }: WithdrawalFormProps) {
  const banks = useBanks()
  const { user } = useAuth()
  const { addNotification } = useNotificationStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // ensure the amount is not more than the available balance
    if (+(data.amount as string) > amount) {
      addNotification("error", "Withdrawal amount cannot be more than your available balance")
      return
    }

    // ensure that there is a quest to withdraw from
    if (!user?.campaigns?.length) {
      addNotification("error", "You do not have any active quest to withdraw from")
      return
    }

    // check for a quest that has at least the amount to be withdrawn
    // if not, convert the amount to the quest currency
    const quest = user.campaigns.find(async (campaign) => {
      const service = CurrencyService.instantiate()
      const hasEnough = (amt: number) => amt >= +(data.amount as string)

      if (campaign.currency === currency) {
        return hasEnough(campaign.wallet.balance)
      }

      const convertedAmount = await service.convert(+(data.amount as string), currency, campaign.currency)
      return hasEnough(convertedAmount)
    })

    if (!quest) {
      addNotification("error", "You do not have enough balance to withdraw")
      return
    }

    // Send the data to the server
    const result = await withdrawAmount(quest.id, { ...(data as any), accountNumber: `${data.accountNumber}` })
    if (!result.success) {
      addNotification("error", result.message)
      return
    }

    addNotification("success", "Withdrawal request has been sent")

    // Proceed to the next step
    onWithdraw?.()
  }

  return (
    <form className="space-y-5 px-3 py-4" onSubmit={handleSubmit}>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Name on Bank
        </Text>
        <TextField.Root
          placeholder="Enter your full name as it appears on your bank account"
          name="accountName"
          type="text"
          required
          style={{ backgroundColor: "#FAFAFA" }}
          size="3"
        />
      </Box>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Account Number
        </Text>
        <TextField.Root
          placeholder="Enter account number"
          name="accountNumber"
          type="number"
          required
          style={{ backgroundColor: "#FAFAFA" }}
          size="3"
        />
      </Box>
      <Flex direction="column" gap="2" className="flex-1">
        <Text size="3" weight="medium">
          Bank Name
        </Text>
        <Select.Root name="bankCode" size="3">
          <Select.Trigger className="w-full" style={{ backgroundColor: "#FAFAFA" }} placeholder="Select your bank" />
          <Select.Content position="popper">
            <Select.Group role="form">
              {banks.map((bank) => (
                <Select.Item key={bank.slug} value={bank.slug}>
                  {bank.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Amount
        </Text>
        <TextField.Root
          placeholder="Enter amount"
          name="amount"
          required
          style={{ backgroundColor: "#FAFAFA" }}
          size="3"
          type="number"
        />
      </Box>
      <Callout.Root color="green">
        <Callout.Icon className="text-green-500">
          <Info size={20} />
        </Callout.Icon>
        <Callout.Text>Please not that withdrawn amount will be converted to your local currency</Callout.Text>
      </Callout.Root>
      <Flex align="center" gap="4" pt="6" ml="auto">
        {children ? (
          children
        ) : (
          <Button intent="primary" type="submit" size="xl">
            Proceed
          </Button>
        )}
      </Flex>
    </form>
  )
}
