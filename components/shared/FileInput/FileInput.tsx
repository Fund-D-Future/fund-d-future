"use client"

import React, { useRef, useState } from "react"
import { IconName, LucideIcon } from "components/shared"
import { Text } from "@radix-ui/themes"

type FileInputProps = {
  name?: string
  label?: string
  icon?: IconName
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const FileInput = ({
  name = "file",
  label = "Select a file...",
  icon = "upload",
  onChange,
  ...rest
}: FileInputProps) => {
  const fileInputRef = useRef<EventTarget & HTMLInputElement>(null)
  const [filename, setFilename] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    setFilename(file ? file.name : "")
    onChange?.(event)
  }

  return (
    <label htmlFor={rest.id || name} className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        name={name}
        id={rest.id || name}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...rest}
      />
      <div
        className="relative flex w-full cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3
                   py-2 text-sm text-gray-900
                   focus-within:border-[#00CF68]
                   focus-within:outline-none focus-within:ring-2 focus-within:ring-[#00CF68] hover:bg-gray-50
                   disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LucideIcon name={icon} size={16} color="green" />
        <Text size="2" weight="medium" className="flex-1">
          {filename || label}
        </Text>
      </div>
    </label>
  )
}

export default FileInput
