import { getUserData } from "app/actions/auth"
import { StoreState } from "types/store"
import { create } from "zustand"
import { createJSONStorage, persist, StateStorage } from "zustand/middleware"

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      loading: false,
      error: null,
      campaigns: [],

      // Basic state setters
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      refreshUser: async () => {
        try {
          set({ loading: true, error: null })
          const userData = await getUserData()
          set({ user: userData, loading: false })
        } catch (error) {
          set({
            error: {
              message: error instanceof Error ? error.message : "Failed to refresh user data",
              code: "AUTH_ERROR",
            },
            loading: false,
          })
          throw error
        }
      },

      // Quest actions with error handling
      createCampaign: async (campaignData) => {
        try {
          const user = get().user
          if (!user || user.role !== "USER") {
            throw new Error("Only students can create campaigns")
          }

          set({ loading: true, error: null })
          const newCampaign = {
            id: Math.random().toString(36).substr(2, 9),
            raisedAmount: 0,
            donors: [],
            ...campaignData,
          }

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          set((state) => ({
            campaigns: [...state.campaigns, newCampaign],
            loading: false,
          }))
        } catch (error) {
          set({
            error: {
              message: error instanceof Error ? error.message : "Failed to create campaign",
              code: "QUEST_ERROR",
            },
            loading: false,
          })
          throw error
        }
      },

      donateToCampaign: async (campaignId, amount) => {
        try {
          const user = get().user
          if (!user || user.role !== "FUNDER") {
            throw new Error("Only funders can donate")
          }

          set({ loading: true, error: null })

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          set((state) => ({
            campaigns: state.campaigns.map((campaign) =>
              campaign.id === campaignId
                ? {
                    ...campaign,
                    raisedFunding: campaign.raisedFunding + amount,
                  }
                : campaign
            ),
            loading: false,
          }))
        } catch (error) {
          set({
            error: {
              message: error instanceof Error ? error.message : "Failed to process donation",
              code: "DONATION_ERROR",
            },
            loading: false,
          })
          throw error
        }
      },

      updateCampaignStatus: async (campaignId, status) => {
        try {
          const user = get().user
          if (!user || user.role !== "ADMIN") {
            throw new Error("Only admins can update campaign status")
          }

          set({ loading: true, error: null })

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          set((state) => ({
            campaigns: state.campaigns.map((campaign) =>
              campaign.id === campaignId ? { ...campaign, status } : campaign
            ),
            loading: false,
          }))
        } catch (error) {
          set({
            error: {
              message: error instanceof Error ? error.message : "Failed to update campaign status",
              code: "QUEST_ERROR",
            },
            loading: false,
          })
          throw error
        }
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : null) as StateStorage),
      partialize: (state) => ({
        user: state.user,
        campaigns: state.campaigns,
      }),
    }
  )
)

export default useStore
