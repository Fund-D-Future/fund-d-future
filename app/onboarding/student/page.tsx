import { Heading, Text } from "@radix-ui/themes"
import { Drill } from "lucide-react"

export default function Page() {
  return (
    <section className="-my-10 mx-auto flex h-screen max-w-2xl flex-col items-center justify-center gap-10">
      <Drill size="100" className="text-[#00CF68]" />
      <div className="mx-auto max-w-xl space-y-5">
        <Heading as="h2" size="6" weight="bold" align="center">
          Student's Onboarding Flow Pending
        </Heading>
        <Text as="p" size="4" weight="regular" align="center" className="px-5">
          In the future, this page will be a continuation of the onboarding process for students, immediately after
          signing up. Here you will provide all the necessary information required to enjoy a seamless experience on the
          platform. Stay tuned!
        </Text>
      </div>
    </section>
  )
}
