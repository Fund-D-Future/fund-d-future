import { Spinner } from "@radix-ui/themes"
import Sidebar, { SidebarItem } from "components/ui/dashboard/sidebar"
import { UserProvider } from "components/ui/dashboard/user-provider"
import { getUserData } from "app/actions/auth"
import { RoutesMap } from "types/routes"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { User } from "types/user"
import { createPortal } from "react-dom"

const menuItems: Record<User["role"], SidebarItem[]> = {
  student: [
    { label: "Home", icon: "house", href: "/dashboard", category: "Main Menu" },
    { label: "Crowdfunding", icon: "hand-helping", href: "/dashboard/crowdfunding", category: "Main Menu" },
    { label: "Profile", icon: "user", href: "/dashboard/profile", category: "Main Menu" },
    { label: "Notifications", icon: "bell", href: "/notifications", category: "Others" },
    { label: "Settings", icon: "settings", href: "/dashboard/settings", category: "Others" },
    { label: "Logout", icon: "log-out", href: "/logout", category: "Others" },
  ],
  funder: [],
  admin: [],
}

type DashboardLayoutProps = {
  student: React.ReactNode
  funder: React.ReactNode
}

async function DashboardLayout({ student, funder }: DashboardLayoutProps) {
  // let userData

  // try {
  //   userData = await getUserData()
  // } catch (error) {
  //   redirect(RoutesMap.LOGIN)
  // }
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar items={menuItems.student} mmi={4} />
      <main className="md:pb-auto flex-1 overflow-y-auto pb-40">{student}</main>
    </div>
    // <Suspense fallback={<Spinner size="3" />}>
    //   <UserProvider initialUser={userData}>
    //     <div className="flex h-screen bg-[#FAFAFA]">
    //       <Sidebar items={menuItems[userData.role]} mmi={4} />
    //       <main className="md:pb-auto flex-1 overflow-y-auto pb-40">
    //         {userData.role === "student" ? student : funder}
    //       </main>
    //     </div>
    //   </UserProvider>
    // </Suspense>
  )
}

export default DashboardLayout
