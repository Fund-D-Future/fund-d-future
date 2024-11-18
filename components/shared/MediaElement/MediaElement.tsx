"use client"

import React, { useEffect, useState } from "react"
import { AspectRatio, Card } from "@radix-ui/themes"
import { IMediaMetadata } from "types/media"

interface MediaElementProps {
  source: File | string
  metadata: IMediaMetadata
  onLoad?: () => void
}

const MediaElement: React.FC<MediaElementProps> = ({ source, metadata, onLoad }) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (source instanceof File) {
      const url = URL.createObjectURL(source)
      setObjectUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [source])

  const src = objectUrl || (typeof source === "string" ? source : "")
  const aspectRatio = metadata.dimensions ? metadata.dimensions.width / metadata.dimensions.height : 16 / 9

  switch (metadata.type) {
    case "image":
      return (
        <Card className="overflow-hidden">
          <AspectRatio ratio={aspectRatio}>
            <img src={src} alt={metadata.fileName} onLoad={onLoad} className="h-full w-full rounded-lg object-cover" />
          </AspectRatio>
        </Card>
      )

    case "video":
      return (
        <Card className="overflow-hidden">
          <AspectRatio ratio={aspectRatio}>
            <video
              src={src}
              controls
              preload="metadata"
              onLoadedMetadata={onLoad}
              className="h-full w-full rounded-lg object-cover"
            >
              <track kind="captions" />
            </video>
          </AspectRatio>
        </Card>
      )

    case "audio":
      return (
        <Card className="p-4">
          <audio src={src} controls preload="metadata" onLoadedMetadata={onLoad} className="w-full">
            <track kind="captions" />
          </audio>
        </Card>
      )

    default:
      return null
  }
}

export default MediaElement
