export enum UserRole {
  STUDENT = "student",
  FUNDER = "funder",
  ADMIN = "admin",
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}
