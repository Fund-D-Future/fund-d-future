export type MediaType = "image" | "video" | "audio" | "unknown"

export interface IMediaMetadata {
  type: MediaType
  mimeType: string
  fileSize: number
  fileName: string
  fileExtension: string
  dimensions?: {
    width: number
    height: number
  }
  duration?: number
  lastModified?: number
  isValid: boolean
  url?: string
}
