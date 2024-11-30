"use client"

import { Dialog } from "@radix-ui/themes"
import { Button } from "components/shared"
import WithdrawalForm from "./form"
import { useState } from "react"

export type WithdrawalPopupProps = {
  amount: number
}

export default function WithdrawalPopup({ amount }: WithdrawalPopupProps) {
  const [step, setStep] = useState(1) // 1: withdrawal form, 2: Enter OTP code, 3: Success

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button intent="primary" size="lg">
          Withdraw
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="4" style={{ padding: 0 }}>
        <Dialog.Title size="4" weight="bold" className="bg-[#FAFAFA] p-5" style={{ color: "#333333" }}>
          Withdrawal
        </Dialog.Title>
        {step === 1 && (
          <WithdrawalForm amount={amount}>
            <>
              <Dialog.Close>
                <Button intent="borderless" size="lg">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" intent="primary" size="lg">
                Proceed
              </Button>
            </>
          </WithdrawalForm>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
