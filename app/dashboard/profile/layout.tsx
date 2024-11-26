"use client"

import { Container, Flex, Heading, TabNav } from "@radix-ui/themes"
import { Button } from "components/shared"
import { usePathname } from "next/navigation"
import { RoutesMap } from "types/routes"

const routes = {
  personalInformation: RoutesMap.PROFILE as string,
  educationalBackground: RoutesMap.PROFILE + "/educational-background",
  academicAndCareerGoals: RoutesMap.PROFILE + "/academic-and-career-goals",
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <form className="mx-5 my-10">
      <Flex align="center" justify="between" gap="4">
        <Heading size="6" weight="bold">
          Profile
        </Heading>
        <Button intent="primary" size="sm" type="submit">
          Update Profile
        </Button>
      </Flex>
      <TabNav.Root size="2" mt="4" color="green">
        <TabNav.Link href={routes.personalInformation} active={isActive(routes.personalInformation)}>
          Personal Information
        </TabNav.Link>
        <TabNav.Link href={routes.educationalBackground} active={isActive(routes.educationalBackground)}>
          Educational Background
        </TabNav.Link>
        <TabNav.Link href={routes.academicAndCareerGoals} active={isActive(routes.academicAndCareerGoals)}>
          Academic and Career Goals
        </TabNav.Link>
      </TabNav.Root>
      <Container mt="3">{children}</Container>
    </form>
  )
}
