export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="radial-gradient-overlay fixed inset-0 h-screen w-screen -z-10"></div>
      <div className="container mx-auto min-h-screen max-w-7xl space-y-20 py-10">{children}</div>
    </>
  )
}
