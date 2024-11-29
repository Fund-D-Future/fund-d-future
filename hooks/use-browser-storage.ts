import { useEffect, useState } from "react"

type BrowserStorageOptions = {
  defaultValue?: any
  serialize?: (value: any) => string
  deserialize?: (value: string) => any
  type?: "local" | "session"
}

export default function useBrowserStorage<T extends object>(
  key: string,
  options: BrowserStorageOptions = { type: "local" }
) {
  const { defaultValue, serialize = JSON.stringify, deserialize = JSON.parse, type = "local" } = options
  const [state, setState] = useState<T | null>(null)
  const [storage, setStorage] = useState<Storage | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    setStorage(type === "local" ? window.localStorage : window.sessionStorage)
  }, [])

  useEffect(() => {
    if (!storage) {
      return
    }

    setState(() => {
      const valueInStorage = storage.getItem(key)
      if (valueInStorage) {
        return deserialize(valueInStorage)
      }
      return typeof defaultValue === "function" ? defaultValue() : defaultValue
    })

    setIsReady(true)
  }, [storage])

  const set = (value: T) => {
    setState(value)
    storage?.setItem(key, serialize(value))
  }

  const remove = () => {
    setState(null)
    storage?.removeItem(key)
  }

  return { isReady, state, set, remove } as const
}
