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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full max-h-screen w-full object-cover md:max-h-[85vh]"
          preload="auto"
        >
          <source src="/something-beautiful-about-funding-startup-education.mp4" type="video/mp4" />
          <source src="/something-beautiful-about-funding-startup-education.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Backdrop */}
        <Box className="absolute inset-0 bg-[#00000080] bg-opacity-75" />
        {/* Content */}
        <Flex
          direction="column"
          gap="6"
          className="absolute left-1/2 top-1/2 w-full max-w-screen-xl -translate-x-1/2 -translate-y-1/2 px-5"
        >
          <Heading size="9" weight="bold" className="text-white">
            <Text className="bg-[#00CF68]">Empowering</Text> Startup Founders,
            <br />
            One click, One Startup, Infinite Potential.
          </Heading>
          <Text size="6" className="max-w-screen-lg text-white">
            FundDFuture connects investors with passionate founders seeking the education to transform their ideas into
            successful startups. Join our ecosystem to make a lasting impact on both the entrepreneur and the startup
            community.
          </Text>
          <Flex gap="5" align="center" mt="3">
            <Button href={!!user ? RoutesMap.DASHBOARD : RoutesMap.SIGNUP + "?role=student"} intent="primary" size="xl">
              Apply for Funding
            </Button>
            <Button href={RoutesMap.QUESTS} intent="secondary" size="xl" style={{ borderColor: "#fff", color: "#fff" }}>
              Fund a Quest
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
