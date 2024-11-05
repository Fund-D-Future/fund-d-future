import { Container, Heading, Select, Text } from "@radix-ui/themes"
import { ArrowTarget } from "components/icons"
import { Button } from "components/shared"
import { countries } from "countries-list"

export default function CompleteOnboardingPage() {
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
        <Select.Root size="3" name="country">
          <Select.Trigger placeholder="Select your residence country" variant="soft" color="green" />
          <Select.Content color="green" variant="soft" position="popper">
            <Select.Group>
              {Object.entries(countries).map(([code, country]) => (
                <Select.Item key={country.name} value={code}>
                  {country.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <div className="mx-auto w-full max-w-md space-y-5">
          <Button intent="primary" size="lg" type="submit" className="w-full">
            <span>Complete user information</span>
          </Button>
          <Button
            intent="borderless"
            size="lg"
            href="/dashboard"
            className="w-full border border-[#0000001A] bg-[#FAFAFA]"
          >
            <span className="text-[#333333]">Continue to dashboard</span>
          </Button>
        </div>
      </form>
    </main>
  )
}
