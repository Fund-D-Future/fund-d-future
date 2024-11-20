import { Flex, Spinner } from "@radix-ui/themes"
import Sidebar, { SidebarItem } from "components/ui/dashboard/sidebar"
import { UserProvider } from "components/user-provider"
import { Suspense } from "react"
import { User } from "types/user"
import { getUserData } from "app/actions/auth"

const menuItems: Record<User["role"], SidebarItem[]> = {
  USER: [
    { label: "Home", icon: "house", href: "/dashboard", category: "Main Menu" },
    { label: "Crowdfunding", icon: "hand-helping", href: "/dashboard/crowdfunding", category: "Main Menu" },
    { label: "Profile", icon: "user", href: "/dashboard/profile", category: "Main Menu" },
    { label: "Notifications", icon: "bell", href: "/notifications", category: "Others" },
    { label: "Settings", icon: "settings", href: "/dashboard/settings", category: "Others" },
    { label: "Logout", icon: "log-out", href: "/logout", category: "Others" },
  ],
  FUNDER: [],
  ADMIN: [],
}

type DashboardLayoutProps = {
  user: React.ReactNode
  funder: React.ReactNode
}

async function DashboardLayout({ user, funder }: DashboardLayoutProps) {
  const userData = await getUserData()
  console.log(userData)
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
          <Sidebar items={menuItems[userData.role]} mmi={4} />
          <main className="md:pb-auto flex-1 overflow-y-auto pb-40">{userData.role === "USER" ? user : funder}</main>
        </div>
      </UserProvider>
    </Suspense>
  )
}

export default DashboardLayout
