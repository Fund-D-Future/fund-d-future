import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    IRON_SESSION_PASSWORD: z.string(),
  },
  client: {
    API_URL: z.string().url(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    IRON_SESSION_PASSWORD: process.env.IRON_SESSION_PASSWORD,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
})
