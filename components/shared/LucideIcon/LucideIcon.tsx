"use client"

import React, { lazy, Suspense } from "react"
import { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />

export type IconName = keyof typeof dynamicIconImports
interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName
}

const LucideIcon = ({ name, ...props }: IconProps) => {
  const Icon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <Icon {...props} />
    </Suspense>
  )
}

export default LucideIcon
