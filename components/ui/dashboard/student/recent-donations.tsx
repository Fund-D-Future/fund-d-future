"use client"

import { Avatar, Box, Card, Flex, Heading, Link, Separator, Text } from "@radix-ui/themes"
import { fetchDonations } from "app/actions/campaigns"
import { RecentDonation, RecentDonationsPreview } from "components/icons"
import { UserContext } from "components/user-provider"
import { env } from "env.mjs"
import { formatCurrency } from "lib/currency"
import { useContext, useEffect, useState } from "react"
import { Donation } from "types/campaign"
import { UserRole } from "types/user"
import { dateHandler } from "utils"
import { createApiClient } from "utils/api"

export default function RecentDonations() {
  const { user } = useContext(UserContext)
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    if (user) {
      fetchDonations().then((donations) => setDonations(donations))
    }
  }, [user])

  return (
    <Card className="flex-1 basis-64 border border-[#0000001A] md:basis-auto">
      <Heading size="6" weight="medium" className="py-1" style={{ color: "#666666" }}>
        Recent Donations
      </Heading>
      <Separator size="4" color="gray" />
      <Flex direction="column" gap="5" my="4">
        {donations.length > 0 ? (
          user?.role === UserRole.STUDENT ? (
            donations.map((donation) => (
              <Card variant="ghost" key={donation.id}>
                <Link href={`/donation/${donation.id}`} asChild>
                  <Flex justify="between" align="center" gap="3">
                    <RecentDonation />
                    <Text size="2" weight="medium" className="flex-1 text-[#777777]">
                      {donation.donor.firstname ?? "Anonymous"} just donated{" "}
                      <strong>{formatCurrency(donation.amount, donation.currency)}</strong>
                    </Text>
                    <Text size="2" weight="medium" className="text-[#777777]">
                      {dateHandler.formatDate(donation.createdAt)}
                    </Text>
                  </Flex>
                </Link>
              </Card>
            ))
          ) : (
            <Flex align="center" gap="3">
              {/* Three of the donors avatars */}
              <Flex gap="0" ml="-1">
                {donations.slice(0, 3).map((donation) => (
                  <Avatar
                    key={donation.id}
                    src={donation.donor.avatar}
                    alt={donation.donor.firstname}
                    fallback="/fallback-avatar.jpeg"
                  />
                ))}
              </Flex>
              <Text size="2" weight="medium" className="flex-1 text-[#777777]">
                {donations.length > 1 ? (
                  <>
                    {donations[0]?.donor.firstname ?? "Anonymous"} and {donations.length - 1} others donated
                  </>
                ) : (
                  <>{donations[0]?.donor.firstname ?? "Anonymous"} just donated</>
                )}
              </Text>
            </Flex>
          )
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
