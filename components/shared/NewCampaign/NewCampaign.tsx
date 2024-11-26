"use client"

import { useFormState, useFormStatus } from "react-dom"
import {
  Box,
  Callout,
  CheckboxCards,
  Container,
  Dialog,
  Flex,
  RadioCards,
  Spinner,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes"
import { createNewCampaign } from "app/actions/campaigns"
import { Button, CurrencySelector, FileInput } from "components/shared"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { FormState, NewCampaignForm } from "lib/definitions"
import { Campaign, CampaignFeature } from "types/campaign"
import { useNotificationStore } from "lib/stores/notification-store"

const supportedCampaignDuration = [
  { value: "30d", label: "30 days" },
  { value: "60d", label: "60 days" },
  { value: "90d", label: "90 days" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
]

const toTitleCase = (str: string) =>
  str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

export default function CreateCampaignForm({
  onSubmitted,
  defaultOpen,
}: {
  onSubmitted: (success: boolean) => void
  defaultOpen?: boolean
}) {
  const [selectable, setSelectable] = useState({
    duration: supportedCampaignDuration[0]!.value,
    feature: [] as string[],
  })
  const { addNotification } = useNotificationStore()

  const isDurationChecked = (value: string) => selectable.duration === value
  const isPurposeChecked = (value: string) => selectable.feature.includes(value)
  const handleSelectableChange = (value: unknown, key: keyof typeof selectable) => {
    setSelectable((prev) => ({ ...prev, [key]: value }))
  }

  const handleCampaignCreation = async (state: FormState<NewCampaignForm>, formData: FormData) => {
    // add the selected duration and purpose to the form data
    formData.append("duration", selectable.duration)
    if (selectable.feature.length > 0) {
      formData.append("feature", selectable.feature[0]!)
    }

    const response = await createNewCampaign(formData)
    if ("code" in response && response.code === "CAMPAIGN_CREATION_FAILED") {
      addNotification("error", response.message)
    } else if ("errors" in response) {
      return response
    } else {
      onSubmitted(true)
    }
  }

  const [state, action] = useFormState(handleCampaignCreation, undefined)
  const { pending } = useFormStatus()

  return (
    <Dialog.Root defaultOpen={defaultOpen}>
      <Dialog.Trigger>
        <Button intent="primary" size="lg">
          Create New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="4" style={{ padding: 0 }}>
        <Dialog.Title size="4" weight="bold" className="bg-[#FAFAFA] p-5" style={{ color: "#333333" }}>
          Create New Campaign
        </Dialog.Title>
        <Box pt="3" px="5" pb="5">
          <Dialog.Description color="green" className="mb-3 block">
            Creating a campaign is a great way to share your story and raise funds for your dreams. Let's get started!
          </Dialog.Description>
          <form action={action} className="space-y-5">
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Name your Campaign
              </Text>
              <TextField.Root
                placeholder="Give your campaign a name that captures your journey and inspires others!"
                name="name"
                required
                style={{ backgroundColor: "#FAFAFA" }}
                size="3"
              />
              {state?.errors?.name && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.name[0]}
                </Text>
              )}
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Describe your Campaign
              </Text>
              <TextArea
                placeholder="Tell your story! Explain why you're raising funds, how they'll help you achieve your dreams, and why this matters to you."
                name="description"
                required
                minLength={10}
                maxLength={1024}
                rows={4}
                style={{ backgroundColor: "#FAFAFA" }}
                size="3"
              />
              {state?.errors?.description && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.description[0]}
                </Text>
              )}
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                How much would you like to raise?
              </Text>
              <Flex
                pl="2"
                py="1"
                pr="5"
                align="center"
                justify="between"
                gap="5"
                className="rounded-lg border border-[#0000001A]"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <TextField.Root
                  placeholder="Set a clear target amount so funders know the goal."
                  name="fundingGoal"
                  type="number"
                  required
                  className="flex-1"
                  style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", outline: "none" }}
                  size="3"
                />
                <CurrencySelector
                  defaultValue="USD"
                  name="currency"
                  style={{ color: "black", backgroundColor: "white", border: "1px solid #0000001A" }}
                />
              </Flex>
              {state?.errors?.fundingGoal && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.fundingGoal[0]}
                </Text>
              )}
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Campaign Duration
              </Text>
              <Flex align="center" gap="3" asChild>
                <RadioCards.Root
                  name="duration"
                  value={selectable.duration}
                  required
                  color="green"
                  size="1"
                  columns="4"
                  onValueChange={(value) => handleSelectableChange(value, "duration")}
                >
                  {supportedCampaignDuration.map(({ label, value }) => (
                    <RadioCards.Item
                      value={value}
                      key={label}
                      style={{ backgroundColor: isDurationChecked(value) ? "#056434" : "#00CF6826" }}
                      className="flex items-center gap-3"
                    >
                      <Text size="2">{label}</Text>
                      <CheckCircle2
                        color="white"
                        fill="green"
                        size={20}
                        className={isDurationChecked(value) ? "block" : "hidden"}
                      />
                    </RadioCards.Item>
                  ))}
                </RadioCards.Root>
              </Flex>
              {state?.errors?.duration && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.duration[0]}
                </Text>
              )}
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Where would these funds go to? (Select at least one)
              </Text>
              <Flex align="center" gap="3" asChild>
                <CheckboxCards.Root
                  name="feature"
                  value={selectable.feature}
                  onValueChange={(value) => handleSelectableChange(value, "feature")}
                  size="1"
                  color="green"
                >
                  {Object.entries(CampaignFeature).map(([key, value]) => (
                    <CheckboxCards.Item
                      value={value}
                      key={key}
                      style={{ backgroundColor: isPurposeChecked(value) ? "#056434" : "#00CF6826" }}
                      className="flex items-center gap-3"
                    >
                      <Text size="2">{toTitleCase(key)}</Text>
                    </CheckboxCards.Item>
                  ))}
                </CheckboxCards.Root>
              </Flex>
              {state?.errors?.feature && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.feature[0]}
                </Text>
              )}
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Photo or Video
              </Text>
              <FileInput
                name="file"
                accept="image/*,video/*"
                required
                label="Upload a photo or video to introduce yourself and your campaign."
              />
            </Box>
            <Flex align="center" justify="end" gap="3" pt="4" className="flex-1">
              <Dialog.Close>
                <Button intent="borderless" size="sm" className="min-w-20 bg-[#FAFAFA]">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button intent="primary" size="sm" type="submit" disabled={pending}>
                {pending && <Spinner size="3" />}
                {pending ? "Creating..." : "Create Campaign"}
              </Button>
            </Flex>
          </form>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}
