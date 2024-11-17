import { CurrencyCode } from "lib/currency"
import { User } from "./user"

export enum CampaignStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface CampaignDonor {
  id: string
  amount: number
  timestamp: string
}

export interface CampaignFile {
  id: string
  url: string
  key: string
  campaign: string
  createdAt: string
  updatedAt?: string
}

export interface CampaignWallet {
  id: string
  balance: number
  currency: CurrencyCode
  campaign: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  fundingGoal: number
  raisedFunding: number
  currency: CurrencyCode
  feature: string
  startDate: string
  endDate: string
  owner: User
  files: CampaignFile[]
  wallet: CampaignWallet
  createdAt: string
  updatedAt?: string
}
