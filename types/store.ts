import { Quest } from "./quest"
import { AuthError, User } from "./user"

export interface StoreState {
  // Auth state
  user: User | null
  loading: boolean
  error: AuthError | null

  // Feature states
  campaigns: Quest[]

  // Auth actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: AuthError | null) => void
  refreshUser: () => Promise<void>
  clearError: () => void

  // Quest actions
  createCampaign: (campaignData: Omit<Quest, "id" | "raisedAmount" | "donors">) => Promise<void>
  donateToCampaign: (campaignId: string, amount: number) => Promise<void>
  updateCampaignStatus: (campaignId: string, status: Quest["status"]) => Promise<void>
}
