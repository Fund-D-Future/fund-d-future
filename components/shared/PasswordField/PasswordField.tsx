"use client"

import { Box, Text, TextField } from "@radix-ui/themes"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

type PasswordFieldProps = {
  label: string
  name?: string
  required?: boolean
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  hasError?: boolean
  errorMessage?: string
}

export default function PasswordField({
  label,
  name,
  required = true,
  placeholder,
  value,
  onChange,
  hasError,
  errorMessage,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box className="space-y-3">
      <Text size="4" weight="medium">
        {label}
      </Text>
      <TextField.Root
        placeholder={placeholder}
        name={name || "password"}
        type={showPassword ? "text" : "password"}
        required={required}
        style={{ backgroundColor: "#FAFAFA" }}
        size="3"
        value={value}
        onChange={onChange}
      >
        <TextField.Slot side="right">
          <Text onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            {showPassword ? <Eye size="16" /> : <EyeOff size="16" />}
          </Text>
        </TextField.Slot>
      </TextField.Root>
      {hasError && (
        <Text size="2" weight="bold" className="text-red-500" as="p">
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}
