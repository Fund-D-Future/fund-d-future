import { useNotificationStore } from "lib/stores/notification-store"
import { useEffect, useState } from "react"
import { PaystackUserBank, UserBank } from "types/user"

export default function useBanks() {
  const [banks, setBanks] = useState<UserBank[]>([])
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    fetch("/api/banks")
      .then((res) => res.json())
      .then((data: any) => {
        if (data.status !== "ok") {
          addNotification("error", data.message)
          return
        }

        const b = data.data as PaystackUserBank[]
        setBanks(
          b.map((bank) => ({
            code: bank.longcode || bank.code,
            slug: bank.slug,
            name: bank.name,
          }))
        )
      })
  }, [])

  return banks
}
