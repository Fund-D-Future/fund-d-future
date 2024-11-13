import { FormState, NewCampaignForm, newCampaignFormSchema } from "lib/definitions"

export async function createNewCampaign(state: FormState<NewCampaignForm>, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const result = newCampaignFormSchema.safeParse(data)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  // TODO: Submit data to the API
  console.log(data)
}
