import { Heading, Text } from "@radix-ui/themes"
import { Construction } from "lucide-react"

export default function Page() {
  return (
    <section className="-my-10 mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-10">
      <Construction size="100" className="text-[#00CF68]" />
      <div className="mx-auto max-w-xl space-y-5">
        <Heading as="h2" size="6" weight="bold" align="center">
          Funder's Onboarding Flow Pending
        </Heading>
        <Text as="p" size="4" weight="regular" align="center" className="px-5">
          We are working hard to bring you the best experience. In the future, this page will be a continuation of the
          onboarding process for funders, immediately after signing up. Stay tuned!
        </Text>
      </div>
    </section>
  )
}
