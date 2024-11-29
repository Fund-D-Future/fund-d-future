"use client"

import { Box, Container, Flex, Heading, IconButton, Skeleton, Text, TextField } from "@radix-ui/themes"
import { completePayment, donateToQuest } from "app/actions/quests"
import { Button, LucideIcon } from "components/shared"
import useBrowserStorage from "hooks/use-browser-storage"
import { useNotificationStore } from "lib/stores/notification-store"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DonationPaymentRequest } from "types/quest"
import { RoutesMap } from "types/routes"

export default function Page({ params }: { params: { id: string } }) {
  const { state, isReady } = useBrowserStorage<Omit<DonationPaymentRequest, "card">>("fdf-d-data", {
    type: "session",
  })
  const router = useRouter()
  const { addNotification } = useNotificationStore()

  const [hasBeenInitiated, setHasBeenInitiated] = useState(false)

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)
      const { expiryDate, otp, ...restOfData } = Object.fromEntries(formData.entries())
      const [expiryMonth, expiryYear] = (expiryDate as string).split("/")
      if (!expiryMonth || !expiryYear) {
        addNotification("error", "Invalid expiry date")
        return
      }

      const data = {
        card: {
          expiryMonth: expiryMonth!,
          expiryYear: expiryYear!,
          ...(restOfData as Pick<DonationPaymentRequest["card"], "cardNumber" | "securityCode">),
        },
        ...state,
      }

      let result: { message: string; success: boolean }
      if (!hasBeenInitiated) {
        result = await donateToQuest(params.id, data)
      } else {
        result = await completePayment(params.id, { otp: otp!, paymentRequest: data })
      }

      if (!result.success) {
        addNotification("error", result.message)
        return
      }

      addNotification("success", result.message)
      if (!hasBeenInitiated) {
        setHasBeenInitiated(true)
      } else {
        router.push(RoutesMap.QUEST_COMPLETE_DONATION_SUCCESS.replace(":slug", params.id))
      }
    } catch (error: any) {
      addNotification("error", error.message)
    }
  }

  // redirect if no donation details
  useEffect(() => {
    if (!isReady) {
      return
    }

    if (!state || !state.emailAddress || !state.amount || !state.currency) {
      addNotification("error", "No donation details found")
      router.back()
    }
  }, [isReady])

  return isReady && state ? (
    <Container my="5" maxWidth="40rem" className="space-y-10">
      <Flex align="center" justify="between" gap="5" my="5">
        <Button intent="borderless" size="lg" className="justify-start px-0" onClick={() => router.back()}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
        <Heading size="6" weight="bold">
          Make Payment
        </Heading>
      </Flex>
      <Box my="2" className="space-y-2">
        <Flex align="center" justify="between" gap="5" pb="3" className="border-b border-[#0000001A]">
          <Flex align="center" gap="2">
            <IconButton size="3" color="green" className="text-white">
              <LucideIcon name="credit-card" size={24} />
            </IconButton>
            <Text size="2" weight="medium">
              {state?.emailAddress}
            </Text>
          </Flex>
          <Flex align="center" gap="1">
            <Text size="3" color="gray" weight="bold" className="opacity-85">
              {state?.currency}
            </Text>
            <Text size="5" weight="bold">
              {(state?.amount as number).toFixed(2)}
            </Text>
          </Flex>
        </Flex>
        <form onSubmit={handlePayment} className="my-5">
          <Heading size="2" weight="bold" align="center">
            Enter your Card Details
          </Heading>
          <Box className={`space-y-5 ${hasBeenInitiated ? "pointer-events-none opacity-50" : ""}`} mt="2">
            <Box className="space-y-2">
              <Text size="4" weight="medium">
                Card number
              </Text>
              <TextField.Root size="3" name="cardNumber" type="text" required placeholder="0000 0000 0000 0000" />
            </Box>
            <Flex align="center" justify="between" direction={{ initial: "column", sm: "row" }}>
              <Box className="space-y-2">
                <Text size="4" weight="medium">
                  Expiry Date
                </Text>
                <TextField.Root size="3" name="expiryDate" type="text" required placeholder="MM/YY" />
              </Box>
              <Box className="space-y-2">
                <Text size="4" weight="medium">
                  CVV
                </Text>
                <TextField.Root size="3" name="securityCode" type="text" min={3} max={3} required placeholder="123" />
              </Box>
            </Flex>
          </Box>
          {hasBeenInitiated && (
            <Box className="space-y-2" mt="5">
              <Text size="4" weight="medium">
                Enter OTP sent to your email
              </Text>
              <TextField.Root size="3" name="otp" type="text" required placeholder="6-digit OTP" />
            </Box>
          )}
          <Box mt="8">
            <Button type="submit" intent="primary" size="xl" className="w-full">
              {hasBeenInitiated ? "Verify Payment" : `Pay ${state?.currency} ${state?.amount}`}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  ) : (
    <Container my="5" maxWidth="40rem">
      <Text>
        <Skeleton height="3rem" loading />
      </Text>
      <Skeleton height="3rem" loading>
        <Text size="4">Loading...</Text>
      </Skeleton>
    </Container>
  )
}
