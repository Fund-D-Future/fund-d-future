import dinero, { Dinero } from "dinero.js"
import currency from "currency.js"

// Get all currency codes from Intl API
export const CURRENCIES = Object.keys(
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).resolvedOptions().numberingSystem
).reduce((acc, locale) => {
  try {
    const codes = Intl.supportedValuesOf("currency")
    codes.forEach((code) => acc.add(code))
  } catch (error) {}

  return acc
}, new Set<string>())

export type CurrencyCode = typeof CURRENCIES extends Set<infer T> ? T : never

interface CurrencyMetadata {
  symbol: string
  name: string
  decimal: string
  thousands: string
  symbolPosition: "prefix" | "suffix"
  locale: string
}

// Detect user's locale
function detectLocale(): string {
  if (typeof navigator !== "undefined") {
    // Get from navigation.languages (array of preferred languages)
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0]!
    }

    return navigator.language || "en-US"
  }

  return "en-US"
}

// Get currency metadata using Intl API
function getCurrencyMetadata(code: string, locale = detectLocale()): CurrencyMetadata {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    currencyDisplay: "narrowSymbol",
  })

  // Format a sample number to extract decimal and thousands separators
  const parts = formatter.formatToParts(123456.78)
  const decimal = parts.find((part) => part.type === "decimal")?.value || "."
  const thousands = parts.find((part) => part.type === "group")?.value || ","
  const symbol = parts.find((part) => part.type === "currency")?.value || code

  // Determine the symbol position
  const symbolPosition = parts.findIndex((part) => part.type === "currency") === 0 ? "prefix" : "suffix"

  // Get the currency name
  const name = new Intl.DisplayNames([locale], { type: "currency" }).of(code) || code

  return {
    symbol,
    name,
    decimal,
    thousands,
    symbolPosition,
    locale,
  }
}

export function formatCurrency(amount: number, code: string, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    currencyDisplay: "narrowSymbol",
  }).format(amount)
}

// Complete currency service
export class CurrencyService {
  private static instance: CurrencyService
  private rateCache: Map<string, { rate: number; timestamp: number }>
  private metadataCache: Map<string, CurrencyMetadata>
  private readonly CACHE_DURATION = 1000 * 60 * 60 // 1 hour

  private constructor() {
    this.rateCache = new Map()
    this.metadataCache = new Map()
  }

  public static instantiate() {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService()
    }

    return CurrencyService.instance
  }

  private getCacheKey(from: string, to: string) {
    return `${from}-${to}`
  }

  private isRateCacheValid(cacheKey: string): boolean {
    const cached = this.rateCache.get(cacheKey)
    if (!cached) return false

    return Date.now() - cached.timestamp < this.CACHE_DURATION
  }

  async getRate(from: string, to: string): Promise<number> {
    const cacheKey = this.getCacheKey(from, to)
    if (this.isRateCacheValid(cacheKey)) {
      return this.rateCache.get(cacheKey)!.rate
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    const data = (await response.json()) as { rates: Record<string, number> }
    const rate = data.rates[to]!

    this.rateCache.set(cacheKey, { rate, timestamp: Date.now() })
    return rate
  }

  async convert(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getRate(from, to)
    return currency(amount).multiply(rate).value
  }

  format(amount: number, code: string, locale?: string): string {
    return formatCurrency(amount, code, locale)
  }

  getMeta(code: string, locale?: string): CurrencyMetadata {
    const cacheKey = this.getCacheKey(code, locale || "en-US")
    if (!this.metadataCache.has(cacheKey)) {
      this.metadataCache.set(cacheKey, getCurrencyMetadata(code, locale))
    }

    return this.metadataCache.get(cacheKey)!
  }

  getSupportedCurrencies(): string[] {
    return Array.from(CURRENCIES)
  }
}
