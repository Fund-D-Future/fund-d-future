import { Button } from "components/shared"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <footer className="fixed inset-x-0 bottom-0 mx-auto flex max-w-5xl items-center justify-end gap-4 p-4">
        <Button intent="borderless" size="lg" href="/legal/policy" className="p-0 font-medium">
          Privacy Policy
        </Button>
        <Button intent="borderless" size="lg" href="/legal/terms" className="p-0 font-medium">
          Terms of Service
        </Button>
      </footer>
    </>
  )
}
