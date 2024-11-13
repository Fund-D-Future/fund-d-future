"use client"

import { CSSProperties, useEffect, useState } from "react"
import { useCurrency } from "hooks/use-currency"
import { Select } from "@radix-ui/themes"

type CurrencySelectorProps = {
  name?: string
  defaultValue?: string
  value?: string
  verbose?: boolean // Show currency name
  onChange?: (currency: string) => void
  style?: CSSProperties
}

export default function CurrencySelector({
  name = "currency",
  defaultValue,
  value,
  verbose = false,
  onChange,
  style,
}: CurrencySelectorProps) {
  const { getSupportedCurrencies, getCurrencyMeta } = useCurrency()
  const [currencies, setCurrencies] = useState<string[]>([])

  useEffect(() => {
    setCurrencies(getSupportedCurrencies())
  }, [])

  return (
    <Select.Root defaultValue={defaultValue} name={name} value={value} onValueChange={onChange} size="2">
      <Select.Trigger placeholder="Currency" variant="ghost" style={{ color: "white", ...style, outline: 0 }} />
      <Select.Content variant="soft" position="popper" color="green" style={{ maxHeight: "20rem" }}>
        <Select.Group>
          {currencies.map((curr) => (
            <Select.Item key={curr} value={curr}>
              <span>{curr}</span>
              {verbose && <span className="text-xs text-gray-500"> - {getCurrencyMeta(curr).name}</span>}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
