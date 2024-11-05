import { Metadata } from "next"

export function constructMetadata({
    title = 'FundDFuture - Transforming financial experiences one student at a time',
    description = 'FundDFuture is a platform that connects students with funding opportunities to help them achieve their academic goals.',
    image = '/thumbnail.png',
    icons = '/favicon.ico',
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
        card: 'summary_large_image',
        title,
        description,
        images: [image],
        creator: '@joshtriedcoding',
      },
      icons,
      metadataBase: new URL('https://funddfuture.com'),
      ...(noIndex && {
        robots: {
          index: false,
          follow: false,
        },
      }),
    }
  }