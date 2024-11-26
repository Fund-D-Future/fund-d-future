import { Box, Flex, Heading, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import { Header, HowWeHelp } from "components/ui/static"
import { RoutesMap } from "types/routes"
import { constructMetadata } from "utils"
import { getUserData } from "./actions/auth"

export const metadata = constructMetadata({ title: "FundDFuture | Take control of your academic future" })

export default async function Web() {
  const user = await getUserData(false)

  return (
    <>
      {/* Hero section */}
      <Box className="relative h-full">
        <Header />
        {/* Background video */}
        <video autoPlay loop muted playsInline className="h-full w-full object-cover" preload="auto">
          <source src="/something-beautiful-about-funding-student-education.mp4" type="video/mp4" />
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Backdrop */}
        <Box className="absolute inset-0 bg-[#00000080] bg-opacity-50" />
        {/* Content */}
        <Flex
          direction="column"
          gap="5"
          className="absolute left-1/2 top-1/2 w-full max-w-screen-lg -translate-x-1/2 -translate-y-1/2 px-5"
        >
          <Heading size="9" weight="bold" className="text-white">
            Empowering Students,
            <br />
            One Donation at a Time!
          </Heading>
          <Text size="4" className="max-w-screen-sm text-white">
            FundDFuture connects students with funders who believe in the power of education. By creating an AI-driven,
            fair funding ecosystem, we make education more accessible to everyone.
          </Text>
          <Flex gap="5" align="center">
            <Button href={!!user ? RoutesMap.DASHBOARD : RoutesMap.SIGNUP + "?role=student"} intent="primary" size="lg">
              Apply for Funding
            </Button>
            <Button
              href={RoutesMap.CAMPAIGNS}
              intent="secondary"
              size="lg"
              style={{ borderColor: "#fff", color: "#fff" }}
            >
              Fund a Campaign
            </Button>
          </Flex>
        </Flex>
      </Box>
      {/* What we offer */}
      <HowWeHelp />
      {/* How it works */}
    </>
  )
}
