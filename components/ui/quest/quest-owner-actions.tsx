"use client"

import { AlertDialog, Flex } from "@radix-ui/themes"
import { endQuest } from "app/actions/quests"
import { Button } from "components/shared"

type CampaignOwnerActionsProps = {
  hasEnded: boolean
}

export default function CampaignOwnerActions({ hasEnded }: CampaignOwnerActionsProps) {
  return (
    <Flex align="center" justify="between" gap="5" my="5">
      <Button intent="primary" size="lg" className="flex-1" disabled={hasEnded}>
        Edit Quest
      </Button>
      <Button intent="secondary" size="lg" className="flex-1" disabled>
        Share
      </Button>
      <AlertDialog.Root>
        <AlertDialog.Trigger disabled={hasEnded}>
          <Button intent="borderless" size="lg" className="flex-1 bg-[#B20000] text-white">
            End Quest
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px" className="space-y-5">
          <AlertDialog.Title>End this campaign?</AlertDialog.Title>
          <AlertDialog.Description>
            Your earnings will be added to your wallet balance and the campaign will be ended. Are you sure you want to
            continue?
          </AlertDialog.Description>
          <Flex gap="3" justify="end" align="center">
            <AlertDialog.Cancel>
              <Button color="gray" intent="borderless" size="sm" className="text-[#777777]">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action formAction={endQuest} disabled={hasEnded}>
              <Button intent="borderless" size="sm" className="bg-[#B20000] text-white">
                End Quest
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  )
}
