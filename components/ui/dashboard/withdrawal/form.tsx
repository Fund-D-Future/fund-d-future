"use client"

import { Box, Callout, Select, Text, TextField } from "@radix-ui/themes"
import { Button } from "components/shared"
import useBanks from "hooks/use-banks"

export type WithdrawalFormProps = {
  amount: number
  children?: React.ReactNode
}

export default function WithdrawalForm({ amount, children }: WithdrawalFormProps) {
  const banks = useBanks({ perPage: "40", next: "1" })

  return (
    <form className="space-y-5">
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Name on Bank
        </Text>
        <TextField.Root
          placeholder="Enter your full name as it appears on your bank account"
          name="accountName"
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
          required
          style={{ backgroundColor: "#FAFAFA" }}
          size="3"
        />
      </Box>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Bank Name
        </Text>
        <Select.Root name="bankCode">
          <Select.Trigger className="w-full" style={{ backgroundColor: "#FAFAFA" }} placeholder="Select your role" />
          <Select.Content position="popper">
            <Select.Group role="form">
              {banks.map((bank) => (
                <Select.Item key={bank.slug} value={bank.code}>
                  {bank.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
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
          value={amount}
          readOnly
        />
      </Box>
      <Callout.Root>
        <Callout.Icon className="text-green-500" />
        <Callout.Text>Please not that withdrawn amount will be converted to your local currency</Callout.Text>
      </Callout.Root>
      <Box mt="5">
        {children ? (
          children
        ) : (
          <Button intent="primary" type="submit" size="xl">
            Proceed
          </Button>
        )}
      </Box>
    </form>
  )
}
