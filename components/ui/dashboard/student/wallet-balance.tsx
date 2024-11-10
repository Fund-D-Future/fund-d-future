"use client"

import { Flex, Text } from "@radix-ui/themes"
import { CurrencySelector } from "components/shared"
import { CurrencyCode, CurrencyService } from "lib/currency"
import { useEffect, useState } from "react"

type WalletBalanceProps = {
  balance: number
  currency: CurrencyCode
  showCurrency?: boolean
  hide?: boolean
}

const currencyService = CurrencyService.instantiate()

export default function WalletBalance({ balance, currency, showCurrency, hide = false }: WalletBalanceProps) {
  const [_balance, setBalance] = useState(balance)
  const [_currency, setCurrency] = useState(currency)
  const [currencyMetadata, setCurrencyMetadata] = useState(currencyService.getMeta(_currency))

  const handleCurrencyChange = (newCurrency: string) => {
    currencyService.convert(balance, currency, newCurrency).then((result) => {
      setCurrency(newCurrency)
      setBalance(result)
    })
  }

  useEffect(() => {
    setCurrencyMetadata(currencyService.getMeta(_currency))
  }, [_currency])

  return (
    <Flex
      direction="row"
      align="center"
      gap="5"
      className="gap-2 text-center text-white"
      style={{ position: "relative" }}
    >
      <Text size="8" className="font-mono font-extrabold">
        {currencyMetadata.symbol}
        {hide ? "****" : _balance.toFixed(2)}
      </Text>
      {showCurrency && (
        <CurrencySelector
          value={_currency}
          onChange={handleCurrencyChange}
          style={{
            position: "absolute",
            bottom: "0",
            left: "calc(100% + 0.5rem)",
            color: "whitesmoke",
          }}
        />
      )}
    </Flex>
  )
}
