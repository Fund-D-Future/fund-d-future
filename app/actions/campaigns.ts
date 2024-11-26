"use server"

import { env } from "env.mjs"
import { newCampaignFormSchema } from "lib/definitions"
import { Campaign, Donation } from "types/campaign"
import { dateHandler } from "utils"
import { createApiClient } from "utils/api"

export async function createNewCampaign(formData: FormData) {
  const api = await createApiClient()

  try {
    const data: Record<string, unknown> = Object.fromEntries(formData.entries())
    const result = newCampaignFormSchema.safeParse(data)
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors }
    }

    // create the start and end date based on the selected duration
    data.startDate = new Date().toISOString()
    data.endDate = dateHandler.addDays(data.startDate as string, dateHandler.durationToDays(data.duration as string))
    delete data.duration

    // set raised amount to 0 and convert funding goal to number
    data.raisedFunding = 0
    data.fundingGoal = +(data.fundingGoal as string)

    // remove the file field from the form data
    const { file, ...rest } = data
    const response = await api.fetch(`${env.API_URL}/campaigns`, {
      method: "POST",
      body: JSON.stringify(rest),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Campaign creation failed")
    }

    const campaign = (await response.json()) as Campaign

    // upload the campaign file before returning the campaign
    if (file) {
      const fileData = new FormData()
      fileData.append("file", file as Blob)
      fileData.append("campaign", campaign.id)
      await api.fetch(`${env.API_URL}/${campaign.id}/upload`, {
        method: "POST",
        body: fileData,
        headers: { "Content-Type": "multipart/form-data" },
      })
    }

    return campaign
  } catch (error) {
    return { message: (error as Error).message, code: "CAMPAIGN_CREATION_FAILED" }
  }
}

export const fetchDonations = async (): Promise<Donation[]> => {
  const api = await createApiClient()

  try {
    const response = await api.fetch(`${env.API_URL}/donations?limit=5`)
    if (!response.ok) {
      return []
    }

    const { body: donations } = (await response.json()) as { body: Donation[] }
    return donations
  } catch (error) {
    return []
  }
}

export const fetchCampaigns = async (query: URLSearchParams): Promise<Campaign[]> => {
  const api = await createApiClient()
  try {
    const response = await api.fetch(`${env.API_URL}/campaigns?${query.toString()}`)
    if (!response.ok) {
      return []
    }

    return (await response.json()) as Campaign[]
  } catch (error) {
    return []
  }
}

export const endCampaign = async (formData: FormData): Promise<void> => {}
