export async function GET({ query }: { query: { country: string; perPage: string; search: string } }) {
  try {
    const response = await fetch("https://api.paystack.co/bank" + new URLSearchParams(query))
    if (!response.ok) {
      throw new Error("Failed to fetch banks")
    }

    return Response.json({ status: "ok", data: await response.json() })
  } catch (error: any) {
    return Response.json({ status: "error", message: error.message })
  }
}
