import { Flex, Link } from "@radix-ui/themes"
import { Button, Logo } from "components/shared"
import { RoutesMap } from "types/routes"

export default function Header() {
  return (
    <header className="absolute left-1/2 top-4 z-50 mx-auto flex w-full max-w-screen-lg -translate-x-1/2 items-center justify-between gap-5 rounded-full bg-white p-5 shadow-md">
      <Logo />
      <nav className="flex items-center gap-5">
        <Link href={RoutesMap.HOME} size="4" style={{ color: "#333333" }} weight="medium">
          Home
        </Link>
        <Link href={RoutesMap.HOME + "#about"} size="4" style={{ color: "#333333" }} weight="medium">
          About
        </Link>
        <Link href={RoutesMap.HOME + "#how-it-works"} size="4" style={{ color: "#333333" }} weight="medium">
          How it works
        </Link>
      </nav>
      <Flex direction="row" align="center" justify="end" gap="3">
        <Button href={RoutesMap.LOGIN} intent="secondary" size="sm">
          Login
        </Button>
        <Button href={RoutesMap.ONBOARDING} intent="primary" size="sm">
          Sign up
        </Button>
      </Flex>
    </header>
  )
}
