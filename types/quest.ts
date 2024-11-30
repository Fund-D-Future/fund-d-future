import { CurrencyCode } from "lib/currency"
import { User } from "./user"

export enum CampaignStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum CampaignFeature {
  STARTUP_SEED_FUNDING = "STARTUP_SEED_FUNDING",
  BUSINESS_ACCELERATORS_AND_BOOTCAMPS = "BUSINESS_ACCELERATORS_AND_BOOTCAMPS",
  MARKET_RESEARCH_AND_PROTOTYPING = "MARKET_RESEARCH_AND_PROTOTYPING",
  TECHNOLOGY_AND_INFRASTRUCTURE = "TECHNOLOGY_AND_INFRASTRUCTURE",
  MARKETING_AND_CUSTOMER_ACQUISITION = "MARKETING_AND_CUSTOMER_ACQUISITION",
  LEGAL_AND_COMPLIANCE_COSTS = "LEGAL_AND_COMPLIANCE_COSTS",
  TEAM_DEVELOPMENT_AND_TRAINING = "TEAM_DEVELOPMENT_AND_TRAINING",
  BUSINESS_MENTORSHIP_PROGRAMS = "BUSINESS_MENTORSHIP_PROGRAMS",
}

export interface QuestDonor {
  id: string
  amount: number
  timestamp: string
}

export interface QuestFile {
  id: string
  url: string
  key: string
  campaign: string
  createdAt: string
  updatedAt?: string
}

export interface QuestWallet {
  id: string
  balance: number
  currency: CurrencyCode
  campaign?: string
}

export interface Quest {
  id: string
  status?: CampaignStatus
  name: string
  description: string
  fundingGoal: number
  raisedFunding: number
  currency: CurrencyCode
  feature: CampaignFeature
  startDate: string
  endDate: string
  owner: User
  files: QuestFile[]
  wallet: QuestWallet
  createdAt: string
  updatedAt?: string
}

export interface Donation {
  id: string
  amount: number
  currency: CurrencyCode
  campaign: Quest
  donor: User
  createdAt: string
  updatedAt?: string
}

export type DonationPaymentRequest = {
  emailAddress: string
  currency: string
  amount: number
  firstName: string
  lastName: string
  phoneNumber: string
  description: string
  // card details
  card: {
    expiryMonth: string
    expiryYear: string
    cardNumber: string
    securityCode: string
  }
}
