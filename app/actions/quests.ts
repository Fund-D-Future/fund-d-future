"use server"

import { env } from "env.mjs"
import { newCampaignFormSchema } from "lib/definitions"
import { Quest, Donation, DonationPaymentRequest } from "types/quest"
import { dateHandler } from "utils"
import { createApiClient } from "utils/api"

export async function createNewQuest(formData: FormData) {
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
      throw new Error("Quest creation failed")
    }

    // upload the quest file before returning the quest
    // if (file) {
    //   const fileData = new FormData()
    //   fileData.append("file", file as Blob)
    //   fileData.append("quest", quest.id)
    //   await api.fetch(`${env.API_URL}/${quest.id}/upload`, {
    //     method: "POST",
    //     body: fileData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    // }
    return true
  } catch (error) {
    return { message: (error as Error).message, code: "QUEST_CREATION_FAILED" }
  }
}

export const fetchDonations = async (questId: string): Promise<Donation[]> => {
  const api = await createApiClient()

  try {
    const response = await fetch(`${env.API_URL}/donations/campaign/${questId}`)
    if (!response.ok) {
      return []
    }

    const donations = (await response.json()) as Donation[]
    return donations
  } catch (error) {
    return []
  }
}

export const fetchQuests = async (query: URLSearchParams): Promise<Quest[]> => {
  const api = await createApiClient()
  try {
    const response = await api.fetch(`${env.API_URL}/campaigns?${query.toString()}`)
    if (!response.ok) {
      return []
    }

    return (await response.json()) as Quest[]
  } catch (error) {
    return []
  }
}

export const endQuest = async (formData: FormData): Promise<void> => {
  // TODO: Implement this function
}

export async function getCampaignDetails(slug: string): Promise<Quest | null> {
  try {
    const response = await fetch(`${env.API_URL}/campaigns/${slug}`)
    if (!response.ok) {
      throw new Error("Failed to fetch quest details")
    }

    return response.json() as Promise<Quest>
  } catch (error) {
    return null
  }
}

export async function donateToQuest(
  questId: string,
  data: Partial<DonationPaymentRequest>
): Promise<{
  message: string
  success: boolean
}> {
  try {
    const response = await fetch(`${env.API_URL}/payments/card/${questId}/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to initiate payment")
    }

    return { success: true, message: (await response.text()) as string }
  } catch (error) {
    return { message: (error as Error).message, success: false }
  }
}

export async function completePayment(
  questId: string,
  data: Record<string, unknown>
): Promise<{
  message: string
  success: boolean
}> {
  try {
    const response = await fetch(`${env.API_URL}/payments/card/${questId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to complete payment")
    }

    return { success: true, message: (await response.text()) as string }
  } catch (error) {
    return { message: (error as Error).message, success: false }
  }
}

export async function withdrawAmount(
  questId: string,
  data: {
    accountName: string
    accountNumber: string
    bankCode: string
    amount: number
  }
) {
  try {
    const response = await fetch(`${env.API_URL}/campaigns/${questId}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to withdraw")
    }

    return { success: true, message: (await response.text()) as string }
  } catch (error) {
    return { message: (error as Error).message, success: false }
  }
}
