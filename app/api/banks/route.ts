export async function GET() {
  try {
    const response = await fetch("https://api.paystack.co/bank")
    if (!response.ok) {
      throw new Error("Failed to fetch banks")
    }

    const { data } = (await response.json()) as { data: any }
    return Response.json({ status: "ok", data })
  } catch (error: any) {
    return Response.json({ status: "error", message: error.message })
  }
}
