export enum RoutesMap {
  HOME = "/",

  // Onboarding routes
  ONBOARDING = "/onboarding",
  SIGNUP = "/onboarding/signup",
  LOGIN = "/onboarding/login",
  FORGOT_PASSWORD = "/onboarding/forgot-password",
  RESET_PASSWORD = "/onboarding/reset-password",

  // Quest routes
  QUESTS = "/quests",
  EDIT_QUEST = "/quests/:slug/edit",

  DASHBOARD = "/dashboard",
  CROWDFUNDING = "/dashboard/crowdfunding",
  NOTIFICATIONS = "/dashboard/notifications",
  PROFILE = "/dashboard/profile",
  SETTINGS = "/dashboard/settings",
  LOGOUT = "/dashboard/logout",
}
