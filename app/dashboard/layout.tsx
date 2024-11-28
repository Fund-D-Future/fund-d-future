import { Flex, Spinner } from "@radix-ui/themes"
import Sidebar, { SidebarItem } from "components/ui/dashboard/sidebar"
import { UserProvider } from "components/user-provider"
import { Suspense } from "react"
import { getUserData } from "app/actions/auth"
import { redirect, RedirectType } from "next/navigation"
import { RoutesMap } from "types/routes"

const menuItems: SidebarItem[] = [
  { label: "Home", icon: "house", href: RoutesMap.DASHBOARD, category: "Main Menu" },
  { label: "Crowdfunding", icon: "hand-helping", href: RoutesMap.CROWDFUNDING, category: "Main Menu" },
  { label: "Profile", icon: "user", href: RoutesMap.PROFILE, category: "Main Menu" },
  { label: "Notifications", icon: "bell", href: RoutesMap.NOTIFICATIONS, category: "Others" },
  { label: "Settings", icon: "settings", href: RoutesMap.SETTINGS, category: "Others" },
  { label: "Logout", icon: "log-out", href: RoutesMap.LOGOUT, category: "Others" },
]

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserData()
  if (!userData) {
    redirect(RoutesMap.LOGIN, RedirectType.replace)
  }

  return (
    <Suspense
      fallback={
        <Flex justify="center" align="center" height="100vh">
          <Spinner />
        </Flex>
      }
    >
      <UserProvider initialUser={userData}>
        <div className="flex h-screen bg-[#FAFAFA]">
          <Sidebar items={menuItems} mmi={4} />
          <main className="md:pb-auto flex-1 overflow-y-auto pb-40">{children}</main>
        </div>
      </UserProvider>
    </Suspense>
  )
}

export default DashboardLayout
