import { Box, Flex, Heading, Link, Text } from "@radix-ui/themes"
import { Button } from "components/shared"
import { Header, HowWeHelp } from "components/ui/static"
import { RoutesMap } from "types/routes"
import { constructMetadata } from "utils"

export const metadata = constructMetadata()

export default function Web() {
  const sectionSwitches: Record<string, string> = {
    "how-we-help": "students",
  }

  const updateSwitch = (section: string, value: string) => {
    sectionSwitches[section] = value
  }

  return (
    <>
      {/* Hero section */}
      <Box className="relative h-full">
        <Header />
        {/* Background video */}
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
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
            <Button href={RoutesMap.SIGNUP + "?role=student"} intent="primary" size="lg">
              Apply for Funding
            </Button>
            <Button
              href={RoutesMap.SIGNUP + "?role=funder"}
              intent="secondary"
              size="lg"
              style={{ borderColor: "#fff", color: "#fff" }}
            >
              Become a Funder
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
