import { MediaElement } from "components/shared"
import { ReactNode } from "react"
import { IMediaMetadata, MediaType } from "types/media"

class MediaMetadataManager {
  private readonly imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "avif"])

  private readonly videoExtensions = new Set(["mp4", "webm", "ogg", "mov", "avi", "mkv", "m4v"])

  private readonly audioExtensions = new Set(["mp3", "wav", "ogg", "m4a", "aac", "flac"])

  /**
   * Get detailed metadata for a file or URL
   */
  async getMediaMetadata(source: File | string): Promise<IMediaMetadata> {
    if (typeof source === "string") {
      return this.getUrlMetadata(source)
    }
    return this.getFileMetadata(source)
  }

  /**
   * Get metadata from a URL
   */
  private async getUrlMetadata(url: string): Promise<IMediaMetadata> {
    // Get file extension from URL
    const extension = this.getFileExtension(url).toLowerCase()
    const type = this.determineMediaType(extension)

    // Basic metadata that we can get without loading the file
    const metadata: IMediaMetadata = {
      type,
      mimeType: this.getMimeTypeFromExtension(extension),
      fileSize: 0, // Will be updated after fetch
      fileName: this.getFileNameFromUrl(url),
      fileExtension: extension,
      isValid: this.isValidMediaExtension(extension),
      url,
    }

    try {
      // Try to get file size and mime type from headers
      const headers = await this.fetchHeaders(url)
      if (headers) {
        metadata.fileSize = parseInt(headers.get("content-length") || "0", 10)
        metadata.mimeType = headers.get("content-type") || metadata.mimeType
      }

      // Get dimensions/duration based on media type
      if (type === "image") {
        metadata.dimensions = await this.getImageDimensionsFromUrl(url)
      } else if (type === "video") {
        const videoMetadata = await this.getVideoMetadataFromUrl(url)
        metadata.dimensions = videoMetadata.dimensions
        metadata.duration = videoMetadata.duration
      } else if (type === "audio") {
        metadata.duration = await this.getAudioDurationFromUrl(url)
      }
    } catch (error) {
      console.error("Error getting URL metadata:", error)
    }

    return metadata
  }

  /**
   * Get metadata from a File object
   */
  private async getFileMetadata(file: File): Promise<IMediaMetadata> {
    const extension = this.getFileExtension(file.name).toLowerCase()
    const type = this.determineMediaType(extension)
    const metadata: IMediaMetadata = {
      type,
      mimeType: file.type,
      fileSize: file.size,
      fileName: file.name,
      fileExtension: extension,
      lastModified: file.lastModified,
      isValid: this.isValidMediaFile(file),
    }

    try {
      if (type === "image") {
        metadata.dimensions = await this.getImageDimensions(file)
      } else if (type === "video") {
        const videoMetadata = await this.getVideoMetadata(file)
        metadata.dimensions = videoMetadata.dimensions
        metadata.duration = videoMetadata.duration
      } else if (type === "audio") {
        metadata.duration = await this.getAudioDuration(file)
      }
    } catch (error) {
      console.error("Error getting file metadata:", error)
    }

    return metadata
  }

  /**
   * Create an HTML element for the media source
   */
  async createMediaElement(source: File | string): Promise<ReactNode> {
    const metadata = await this.getMediaMetadata(source)

    return (
      <MediaElement
        source={source}
        metadata={metadata}
        onLoad={() => {
          // Additional load handling if needed
        }}
      />
    )
  }

  /**
   * Fetch headers from a URL
   */
  private async fetchHeaders(url: string): Promise<Headers | null> {
    try {
      const response = await fetch(url, { method: "HEAD" })
      if (response.ok) {
        return response.headers
      }
    } catch (error) {
      console.error("Error fetching headers:", error)
    }
    return null
  }

  /**
   * Get image dimensions from URL
   */
  private getImageDimensionsFromUrl(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      }
      img.onerror = reject
      img.src = url
    })
  }

  /**
   * Get video metadata from URL
   */
  private getVideoMetadataFromUrl(
    url: string
  ): Promise<{ dimensions: { width: number; height: number }; duration: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        resolve({
          dimensions: {
            width: video.videoWidth,
            height: video.videoHeight,
          },
          duration: video.duration,
        })
      }
      video.onerror = reject
      video.src = url
    })
  }

  /**
   * Get audio duration from URL
   */
  private getAudioDurationFromUrl(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.preload = "metadata"
      audio.onloadedmetadata = () => {
        resolve(audio.duration)
      }
      audio.onerror = reject
      audio.src = url
    })
  }

  /**
   * Get MIME type from file extension
   */
  private getMimeTypeFromExtension(extension: string): string {
    const mimeTypes: Record<string, string> = {
      // Images
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      bmp: "image/bmp",
      svg: "image/svg+xml",
      avif: "image/avif",
      // Videos
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
      mkv: "video/x-matroska",
      m4v: "video/x-m4v",
      // Audio
      mp3: "audio/mpeg",
      wav: "audio/wav",
      m4a: "audio/m4a",
      aac: "audio/aac",
      flac: "audio/flac",
    }

    return mimeTypes[extension] || "application/octet-stream"
  }

  /**
   * Get filename from URL
   */
  private getFileNameFromUrl(url: string): string {
    try {
      const urlObject = new URL(url)
      const pathname = urlObject.pathname
      const segments = pathname.split("/")
      const filename = segments[segments.length - 1]
      return filename || "unknown"
    } catch {
      return "unknown"
    }
  }

  /**
   * Check if a file extension is valid
   */
  private isValidMediaExtension(extension: string): boolean {
    return (
      this.imageExtensions.has(extension) || this.videoExtensions.has(extension) || this.audioExtensions.has(extension)
    )
  }

  /**
   * Check if a file is valid
   */
  private isValidMediaFile(file: File): boolean {
    const extension = this.getFileExtension(file.name).toLowerCase()
    return this.isValidMediaExtension(extension)
  }

  /**
   * Get the appropriate HTML element type for rendering
   */
  getMediaElement(metadata: IMediaMetadata): string {
    switch (metadata.type) {
      case "image":
        return "img"
      case "video":
        return "video"
      case "audio":
        return "audio"
      default:
        throw new Error("Unsupported media type")
    }
  }

  /**
   * Generate attributes for the media element
   */
  getMediaAttributes(metadata: IMediaMetadata): Record<string, string> {
    const commonAttributes: Record<string, string> = {
      "data-filename": metadata.fileName,
      title: metadata.fileName,
    }

    if (metadata.dimensions) {
      commonAttributes["width"] = metadata.dimensions.width.toString()
      commonAttributes["height"] = metadata.dimensions.height.toString()
    }

    switch (metadata.type) {
      case "image":
        return {
          ...commonAttributes,
          alt: metadata.fileName,
        }
      case "video":
        return {
          ...commonAttributes,
          controls: "true",
          preload: "metadata",
        }
      case "audio":
        return {
          ...commonAttributes,
          controls: "true",
          preload: "metadata",
        }
      default:
        return commonAttributes
    }
  }

  /**
   * Determine the type of media file
   */
  private determineMediaType(extension: string): MediaType {
    if (this.imageExtensions.has(extension)) return "image"
    if (this.videoExtensions.has(extension)) return "video"
    if (this.audioExtensions.has(extension)) return "audio"
    return "unknown"
  }

  /**
   * Get file extension from filename
   */
  private getFileExtension(filename: string): string {
    return filename.split(".").pop() || ""
  }

  /**
   * Get image dimensions
   */
  private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
        URL.revokeObjectURL(img.src)
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * Get video metadata
   */
  private getVideoMetadata(file: File): Promise<{ dimensions: { width: number; height: number }; duration: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        resolve({
          dimensions: {
            width: video.videoWidth,
            height: video.videoHeight,
          },
          duration: video.duration,
        })
        URL.revokeObjectURL(video.src)
      }
      video.onerror = reject
      video.src = URL.createObjectURL(file)
    })
  }

  /**
   * Get audio duration
   */
  private getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.preload = "metadata"
      audio.onloadedmetadata = () => {
        resolve(audio.duration)
        URL.revokeObjectURL(audio.src)
      }
      audio.onerror = reject
      audio.src = URL.createObjectURL(file)
    })
  }

  /**
   * Format file size to human-readable string
   */
  formatFileSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB"]
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  /**
   * Format duration to human-readable string
   */
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }
}

export default new MediaMetadataManager()
