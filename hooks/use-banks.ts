import { useEffect, useState } from "react"
import { UserBank } from "types/user"

export type UseBanksProps = {
  perPage?: string
  next?: string
  previous?: string
}

export default function useBanks({ perPage = "40", next = "1", previous }: UseBanksProps) {
  const [banks, setBanks] = useState<UserBank[]>([])

  useEffect(() => {
    const prepareQuery = (perPage: string, next: string, previous?: string) => {
      const q = new URLSearchParams()
      q.set("perPage", perPage)
      q.set("next", next)
      if (previous) {
        q.set("previous", previous)
      }

      return q.toString()
    }

    fetch("/api/banks" + "?" + prepareQuery(perPage, next, previous))
      .then((res) => res.json())
      .then((data) => {
        if ((data as any).status === "ok") {
          setBanks((data as any).data)
        }
      })
  }, [perPage, next, previous])

  return banks
}
