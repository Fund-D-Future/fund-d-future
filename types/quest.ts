import { CurrencyCode } from "lib/currency"
import { User } from "./user"

export enum CampaignStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum CampaignFeature {
  TUITION_FEES = "TUITION_FEES",
  ACCOMMODATION_AND_LIVING_EXPENSES = "ACCOMMODATION_AND_LIVING_EXPENSES",
  TEXTBOOKS_AND_STUDY_MATERIALS = "TEXTBOOKS_AND_STUDY_MATERIALS",
  TECH_EQUIPMENT = "TECH_EQUIPMENT",
  BOOTCAMPS_AND_CERTIFICATIONS = "BOOTCAMPS_AND_CERTIFICATIONS",
  STUDY_ABROAD_OR_EXCHANGE_PROGRAMMES = "STUDY_ABROAD_OR_EXCHANGE_PROGRAMMES",
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
  files: CampaignFile[]
  wallet: CampaignWallet
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
