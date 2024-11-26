class DateUtils {
  /**
   * Parses a date string into a Date object
   * Supports formats: YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY
   */
  private parseDate(dateStr: string): Date {
    // Handle different date formats
    const formats = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
    ]

    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return date
    }

    throw new Error("Invalid date format. Please use YYYY-MM-DD, MM/DD/YYYY, or DD-MM-YYYY")
  }

  /**
   * Calculates the number of days between two dates
   */
  getDaysBetween(startDate: string, endDate: string): number {
    const start = this.parseDate(startDate)
    const end = this.parseDate(endDate)

    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Calculates the number of business days between two dates (excluding weekends)
   */
  getBusinessDaysBetween(startDate: string, endDate: string): number {
    const start = this.parseDate(startDate)
    const end = this.parseDate(endDate)

    let count = 0
    const current = new Date(start)

    while (current <= end) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++
      }
      current.setDate(current.getDate() + 1)
    }

    return count
  }

  /**
   * Adds a specified number of days to a date
   */
  addDays(date: string, days: number, preserveTimestamp: boolean = true): string {
    const parsedDate = this.parseDate(date)
    parsedDate.setDate(parsedDate.getDate() + days)
    return preserveTimestamp ? parsedDate.toISOString() : parsedDate.toISOString().split("T")[0]!
  }

  /**
   * Subtracts a specified number of days from a date
   */
  subtractDays(date: string, days: number): string {
    return this.addDays(date, -days)
  }

  /**
   * Checks if a date falls within a date range
   */
  isDateInRange(date: string, startDate: string, endDate: string): boolean {
    const checkDate = this.parseDate(date)
    const start = this.parseDate(startDate)
    const end = this.parseDate(endDate)

    return checkDate >= start && checkDate <= end
  }

  /**
   * Gets the difference between two dates in various units
   */
  getDateDifference(
    startDate: string,
    endDate: string
  ): {
    days: number
    months: number
    years: number
  } {
    const start = this.parseDate(startDate)
    const end = this.parseDate(endDate)

    const yearDiff = end.getFullYear() - start.getFullYear()
    const monthDiff = end.getMonth() - start.getMonth()
    const dayDiff = end.getDate() - start.getDate()

    let months = monthDiff + yearDiff * 12
    let days = this.getDaysBetween(startDate, endDate)

    return {
      days,
      months,
      years: Math.floor(months / 12),
    }
  }

  /**
   * Format a date to a specific string format
   */
  formatDate(date: string, format: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD-MM-YYYY" = "YYYY-MM-DD"): string {
    const parsedDate = this.parseDate(date)
    const day = String(parsedDate.getDate()).padStart(2, "0")
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
    const year = parsedDate.getFullYear()

    switch (format) {
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`
      default:
        return `${year}-${month}-${day}`
    }
  }

  /**
   * Check if a year is a leap year
   */
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  /**
   * Get the quarter of a date
   */
  getQuarter(date: string): number {
    const parsedDate = this.parseDate(date)
    return Math.floor(parsedDate.getMonth() / 3) + 1
  }

  /**
   * Convert duration string to days
   * Supported formats: 30d, 60d, 90d, 6m, 1y
   */
  durationToDays(duration: string): number {
    const durationMap: Record<string, number> = {
      "30d": 30,
      "60d": 60,
      "90d": 90,
      "6m": 180,
      "1y": 365,
    }

    if (Object.keys(durationMap).includes(duration)) {
      return durationMap[duration]!
    }

    return 0
  }

  isWithinDeadline(date: string, deadline: string): boolean {
    const parsedDate = this.parseDate(date)
    const parsedDeadline = this.parseDate(deadline)

    return parsedDate <= parsedDeadline
  }
}

export default new DateUtils()
