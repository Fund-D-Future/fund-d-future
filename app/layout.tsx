import "styles/tailwind.css"
import "@radix-ui/themes/styles.css"

import { Theme } from "@radix-ui/themes"
import { Notifications } from "components/shared"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        <Theme>{children}</Theme>
        <Notifications />
      </body>
    </html>
  )
}
