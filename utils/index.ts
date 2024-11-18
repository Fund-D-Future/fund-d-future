import { Metadata } from "next"
import { z } from "zod"

export function constructMetadata({
  title = "FundDFuture - Transforming financial experiences one student at a time",
  description = "FundDFuture is a platform that connects students with funding opportunities to help them achieve their academic goals.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@funddfuture",
    },
    icons,
    metadataBase: new URL("https://funddfuture.com"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function isValidHexToken(token: string, length?: number): boolean {
  return z
    .string()
    .min(8)
    .regex(/^[0-9a-fA-F]+$/) // Check if the token is a valid hex string
    .refine((value) => value.trim().length > 0 && (length ? value.length === length : true))
    .safeParse(token).success
}

export { default as dateHandler } from "./date-handler"
export { default as mediaMetadataManager } from "./media-metadata"
