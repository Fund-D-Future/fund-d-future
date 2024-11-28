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
  QUEST = "/quests/:slug",
  QUEST_COMPLETE_DONATION = "/quests/:slug/complete-donation",
  QUEST_COMPLETE_DONATION_SUCCESS = "/quests/:slug/complete-donation/success",
  QUEST_EDIT = "/quests/:slug/edit",

  DASHBOARD = "/dashboard",
  CROWDFUNDING = "/dashboard/crowdfunding",
  NOTIFICATIONS = "/dashboard/notifications",
  PROFILE = "/dashboard/profile",
  SETTINGS = "/dashboard/settings",
  LOGOUT = "/dashboard/logout",
}
