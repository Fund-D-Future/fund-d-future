import { CurrencyService } from "lib/currency"
import { useState } from "react"

export function useCurrency() {
  const [loading, setLoading] = useState(false)
  const currencyService = CurrencyService.instantiate()

  const convertAmount = async (amount: number, from: string, to: string) => {
    setLoading(true)
    try {
      const result = await currencyService.convert(amount, from, to)
      return result
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    convertAmount,
    formatCurrency: currencyService.format.bind(currencyService),
    getCurrencyMeta: currencyService.getMeta.bind(currencyService),
    getSupportedCurrencies: currencyService.getSupportedCurrencies.bind(currencyService),
  }
}
