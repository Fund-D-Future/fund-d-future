import { env } from "env.mjs"
import { FormState, NewCampaignForm, newCampaignFormSchema } from "lib/definitions"
import { Donation } from "types/campaign"
import { createApiClient } from "utils/api"

export async function createNewCampaign(state: FormState<NewCampaignForm>, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const result = newCampaignFormSchema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  // TODO: Submit data to the API
  console.log(data)
}

export const fetchDonations = async (): Promise<Donation[]> => {
  try {
    const api = await createApiClient()
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
