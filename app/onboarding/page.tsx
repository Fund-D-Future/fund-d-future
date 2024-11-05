import { Metadata } from "next"
import { Button } from "components/shared"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import { Donation, GradStudent } from "components/icons"
import { RoutesMap } from "lib/constants"

export const metadata: Metadata = {
  title: "FundDFuture | Onboarding",
}

interface RoleCardProps {
  title: string
  description: string
  children: React.ReactNode
  href: string
}

function RoleCard({ title, description, children, href }: RoleCardProps) {
  return (
    <Link href={href}>
      <div className="flex cursor-pointer items-center gap-5 rounded-md border border-[#9999991A] bg-[#9999991A] px-3 py-8">
        {children}
        <div className="flex-grow space-y-2">
          <Heading as="h3" size="4" weight="bold">
            {title}
          </Heading>
          <Text as="p" size="4" weight="regular" className="text-[#777777]">
            {description}
          </Text>
        </div>
        <ChevronRight size={25} color="gray" />
      </div>
    </Link>
  )
}

export default async function Page() {
  return (
    <>
      <header>
        <Button intent="borderless" size="lg" href={RoutesMap.HOME}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-20 px-3">
        <header className="space-y-10 px-10 text-center">
          <Heading as="h2" size="8" weight="bold">
            Tell Us Who You Are
          </Heading>
          <Text as="p" size="6" color="gray" weight="regular">
            Choose the role that best describes you to get a personalized experience.
          </Text>
        </header>
        <section className="flex w-full flex-col gap-8">
          <RoleCard
            title="Student"
            description="I'm here to seek funding opportunities for my education."
            href={`${RoutesMap.SIGNUP}?role=student`}
          >
            <GradStudent />
          </RoleCard>
          <RoleCard
            title="Funder"
            description="I want to support students through funding or scholarships."
            href={`${RoutesMap.SIGNUP}?role=funder`}
          >
            <Donation />
          </RoleCard>
        </section>
      </main>
    </>
  )
}
