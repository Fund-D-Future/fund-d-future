"use client"

import { Heading, Select, Text } from "@radix-ui/themes"
import { updateProfile } from "app/actions/auth"
import { ArrowTarget } from "components/icons"
import { Button } from "components/shared"
import { countries } from "countries-list"
import { useNotificationStore } from "lib/stores/notification-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RoutesMap } from "types/routes"

export default function CompleteOnboardingPage() {
  const [country, setCountry] = useState<string>()
  const { addNotification } = useNotificationStore()
  const router = useRouter()

  const handleNavigate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // update user information with the selected country
    try {
      await updateProfile({ residentCountry: country })
      router.push(RoutesMap.PROFILE)
    } catch (error) {
      addNotification("error", (error as Error).message)
    }
  }

  return (
    <main>
      <header className="flex flex-col items-center space-y-6 text-center">
        <ArrowTarget />
        <Heading size="8">Welcome on Board!</Heading>
      </header>
      <Text as="p" size="5" weight="bold" className="mx-auto mt-10 max-w-3xl text-center text-[#777777]">
        We're thrilled to have you here as part of our community, dedicated to empowering students like you to achieve
        your educational dreams.
      </Text>
      <form className="mt-20 flex flex-col items-center space-y-20">
        <Select.Root size="3" name="country" value={country} onValueChange={setCountry}>
          <Select.Trigger placeholder="Select your residence country" variant="soft" color="green" />
          <Select.Content color="green" variant="soft" position="popper">
            <Select.Group>
              {Object.entries(countries).map(([code, country]) => (
                <Select.Item key={country.name} value={country.name.toUpperCase()}>
                  {country.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <div className="mx-auto w-full max-w-md space-y-5">
          <Button
            intent="primary"
            size="lg"
            type="submit"
            className="w-full"
            onClick={handleNavigate}
            disabled={!country}
          >
            <span>Complete user information</span>
          </Button>
          <Button
            intent="borderless"
            size="lg"
            className="w-full border border-[#0000001A] bg-[#FAFAFA]"
            href={RoutesMap.DASHBOARD}
          >
            <span className="text-[#333333]">Continue to dashboard</span>
          </Button>
        </div>
      </form>
    </main>
  )
}
