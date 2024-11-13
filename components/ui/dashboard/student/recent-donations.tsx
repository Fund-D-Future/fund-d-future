import { Box, Card, Flex, Heading, Link, Separator, Text } from "@radix-ui/themes"
import { RecentDonation, RecentDonationsPreview } from "components/icons"
import { formatCurrency } from "lib/currency"

type RecentDonation = {
  id: string
  donatedBy: string
  amount: number
  currency: string
  donatedAt: string
}

export default function RecentDonations({ donations }: { donations: RecentDonation[] }) {
  return (
    <Card className="flex-1 basis-64 border border-[#0000001A] md:basis-auto">
      <Heading size="6" weight="medium" className="py-1" style={{ color: "#666666" }}>
        Recent Donations
      </Heading>
      <Separator size="4" color="gray" />
      <Flex direction="column" gap="5" my="4">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <Card variant="ghost" key={donation.id}>
              <Link href={`/donation/${donation.id}`} asChild>
                <Flex justify="between" align="center" gap="3">
                  <RecentDonation />
                  <Text size="2" weight="medium" className="flex-1 text-[#777777]">
                    {donation.donatedBy} just donated{" "}
                    <strong>{formatCurrency(donation.amount, donation.currency)}</strong>
                  </Text>
                  <Text size="2" weight="medium" className="text-[#777777]">
                    {donation.donatedAt}
                  </Text>
                </Flex>
              </Link>
            </Card>
          ))
        ) : (
          <>
            <Box className="mx-auto my-5 text-center">
              <RecentDonationsPreview />
            </Box>
            <Text as="p" className="text-center">
              You have no recent donations yet!
            </Text>
          </>
        )}
      </Flex>
    </Card>
  )
}
