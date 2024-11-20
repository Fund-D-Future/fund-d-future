import { Campaign } from "./campaign"

export enum UserRole {
  STUDENT = "USER",
  FUNDER = "FUNDER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  role: UserRole
  avatar?: string
  bio?: string
  institution?: string
  degreeProgram?: string
  courseOfStudy?: string
  yearOfStudy?: number
  grade?: string
  proof?: string
  shortTermGoals?: string[]
  longTermGoals?: string[]
  extraCurricularActivities?: string
  volunteerWork?: string
  residentCountry?: string
  resetPasswordToken?: string
  resetPasswordExpires?: string
  transactionPin?: string
  enabled?: boolean
  username?: string
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  credentialsNonExpired?: boolean
  campaigns: Campaign[]
}

export interface AuthError {
  code?: string
  message: string
}