import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-full",
    "text-center",
    "border",
    "border-[#00CF68]",
    "transition-colors",
    "delay-50",
    "font-semibold",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-[#00CF68]", "text-white", "hover:enabled:bg-[#00CF68]"],
        secondary: ["bg-transparent", "text-[#00CF68]", "hover:enabled:bg-[#00CF68]", "hover:enabled:text-white"],
        borderless: ["bg-secondary", "text-black", "border-0"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
    VariantProps<typeof button> {
  underline?: boolean
  href?: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return props.href ? (
    <a className={twMerge(button({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  ) : (
    <button className={twMerge(button({ intent, size, className, underline }))} {...props}>
      {props.children}
    </button>
  )
}
