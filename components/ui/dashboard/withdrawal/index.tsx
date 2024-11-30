"use client"

import { Dialog } from "@radix-ui/themes"
import { Button } from "components/shared"
import WithdrawalForm from "./form"
import { useState } from "react"
import OTPFormBox from "./otp-box"

export type WithdrawalPopupProps = {
  amount: number
  currency: string
}

export default function WithdrawalPopup({ amount, currency }: WithdrawalPopupProps) {
  const [step, setStep] = useState(1) // 1: withdrawal form, 2: Enter OTP code, 3: Success

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button intent="secondary" size="lg" className="w-40 border-2 border-white text-white">
          Withdraw
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="4" style={{ padding: 0 }}>
        <Dialog.Title size="4" weight="bold" className="bg-[#FAFAFA] p-5" style={{ color: "#333333" }}>
          Withdrawal
        </Dialog.Title>
        {step === 1 && (
          <WithdrawalForm amount={amount} currency={currency}>
            <>
              <Dialog.Close className="flex-1">
                <Button intent="borderless" size="lg" className="w-full">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" intent="primary" size="lg" className="flex-1">
                Proceed
              </Button>
            </>
          </WithdrawalForm>
        )}
        {step === 2 && (
          <OTPFormBox onSuccess={() => setStep(3)}>
            <Dialog.Close className="flex-1">
              <Button intent="borderless" size="lg" className="w-full">
                Cancel
              </Button>
            </Dialog.Close>
          </OTPFormBox>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
