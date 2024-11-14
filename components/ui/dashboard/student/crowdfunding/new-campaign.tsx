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
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes"
import { createNewCampaign } from "app/actions/campaigns"
import { Button, CurrencySelector } from "components/shared"
import { CheckCircle2, Info } from "lucide-react"
import { useState } from "react"
import { FormState, NewCampaignForm } from "lib/definitions"

const supportedCampaignDuration = [
  { value: "30d", label: "30 days" },
  { value: "60d", label: "60 days" },
  { value: "90d", label: "90 days" },
  { value: "6m", label: "6 months" },
  { value: "1y", label: "1 year" },
]

const supportedCampaignPurpose = [
  { value: "tuition", label: "Tuition Fees" },
  { value: "textbooks_and_study_materials", label: "Textbooks and Study Materials" },
  { value: "accommodation_and_living_expenses", label: "Accommodation and Living Expenses" },
  { value: "tech_equipment", label: "Tech Equipment" },
  { value: "bootcamps_and_certifications", label: "Bootcamps and Certifications" },
  { value: "study_abroad_or_exchange_programs", label: "Study Abroad or Exchange Programs" },
]

export default function CreateCampaignForm() {
  const [selectable, setSelectable] = useState({
    duration: supportedCampaignDuration[0]!.value,
    purpose: [] as string[],
  })
  const isDurationChecked = (value: string) => selectable.duration === value
  const isPurposeChecked = (value: string) => selectable.purpose.includes(value)
  const handleSelectableChange = (value: unknown, key: keyof typeof selectable) => {
    setSelectable((prev) => ({ ...prev, [key]: value }))
  }

  const handleCampaignCreation = async (state: FormState<NewCampaignForm>, formData: FormData) => {
    // add the selected duration and purpose to the form data
    formData.append("duration", selectable.duration)
    formData.append("purpose", selectable.purpose.join(","))

    // create the campaign
    return createNewCampaign(state, formData)
  }

  const [state, action] = useFormState(handleCampaignCreation, undefined)
  const { pending } = useFormStatus()

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button intent="primary" size="lg">
          Create New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="4" style={{ padding: 0 }}>
        <Dialog.Title size="4" weight="bold" className="bg-[#FAFAFA] p-5" style={{ color: "#333333" }}>
          Create New Campaign
        </Dialog.Title>
        <Callout.Root color="green" mx="5" mb="3">
          <Callout.Icon>
            <Info size={20} />
          </Callout.Icon>
          <Callout.Text>
            Start your journey by creating a new campaign. Fill in the details below to get started.
          </Callout.Text>
        </Callout.Root>
        <Container pt="3" px="5" pb="5">
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
                  name="goal"
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
              {state?.errors?.goal && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.goal[0]}
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
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Where would these funds go to? (Select at least one)
              </Text>
              <Flex align="center" gap="3" asChild>
                <CheckboxCards.Root
                  name="purpose"
                  value={selectable.purpose}
                  required
                  onValueChange={(value) => handleSelectableChange(value, "purpose")}
                  size="1"
                  color="green"
                >
                  {supportedCampaignPurpose.map(({ label, value }) => (
                    <CheckboxCards.Item
                      value={value}
                      key={label}
                      style={{ backgroundColor: isPurposeChecked(value) ? "#056434" : "#00CF6826" }}
                      className="flex items-center gap-3"
                    >
                      <Text size="2">{label}</Text>
                    </CheckboxCards.Item>
                  ))}
                </CheckboxCards.Root>
              </Flex>
            </Box>
            <Box className="flex-1 space-y-2">
              <Text size="3" weight="medium">
                Photos or Videos
              </Text>
              <TextField.Root
                placeholder="A picture is worth a thousand words! Upload a photo or video to introduce yourself and your campaign."
                name="thumbnail"
                type="url"
                required
                style={{ backgroundColor: "#FAFAFA" }}
                size="3"
              />
            </Box>
            <Flex align="center" justify="end" gap="3" pt="4" className="flex-1">
              <Dialog.Close>
                <Button intent="borderless" size="sm" className="min-w-20 bg-[#FAFAFA]">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button intent="primary" size="sm" type="submit" disabled={pending}>
                Create Campaign
              </Button>
            </Flex>
          </form>
        </Container>
      </Dialog.Content>
    </Dialog.Root>
  )
}
