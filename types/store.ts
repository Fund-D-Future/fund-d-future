import { Campaign } from "./campaign"
import { AuthError, User } from "./user"

export interface StoreState {
  // Auth state
  user: User | null
  loading: boolean
  error: AuthError | null

  // Feature states
  campaigns: Campaign[]

  // Auth actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: AuthError | null) => void
  refreshUser: () => Promise<void>
  clearError: () => void

  // Campaign actions
  createCampaign: (campaignData: Omit<Campaign, "id" | "raisedAmount" | "donors">) => Promise<void>
  donateToCampaign: (campaignId: string, amount: number) => Promise<void>
  updateCampaignStatus: (campaignId: string, status: Campaign["status"]) => Promise<void>
}
