"use client"

import { Box, Flex, Heading, Select, Separator, Spinner, Text, TextField } from "@radix-ui/themes"
import { signup } from "app/actions/auth"
import { Google } from "components/icons"
import { Button, PasswordField } from "components/shared"
import { RoutesMap } from "types/routes"
import { UserRole } from "lib/definitions"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"

export default function Page() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") as UserRole | null

  const [state, action] = useFormState(signup, undefined)
  const { pending } = useFormStatus()

  return (
    <>
      <header className="flex items-center justify-between gap-5">
        <Button intent="borderless" size="lg" href={RoutesMap.ONBOARDING}>
          <ArrowLeft className="s-6 mr-2" />
          <span>Back</span>
        </Button>
        <Button intent="primary" size="lg" href={RoutesMap.LOGIN} className="mr-4">
          <span>Login</span>
          <ChevronRight className="s-6 ml-2" />
        </Button>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-12 px-3">
        <div className="w-full">
          <Button intent="secondary" size="lg" className="flex w-full items-center gap-3 border-[#999999] text-black">
            <Google />
            <span>Continue with Google</span>
          </Button>
        </div>
        <div className="flex w-full items-center gap-4">
          <Separator orientation="horizontal" color="gray" size="4" />
          <Text size="6" weight="medium">
            OR
          </Text>
          <Separator orientation="horizontal" color="gray" size="4" />
        </div>
        <form className="w-full space-y-20" action={action}>
          <Heading as="h2" size="7" weight="bold" align="center">
            Get started with your email
          </Heading>
          <Box as="div" className="space-y-10">
            <Box className="space-y-3">
              <Text size="4" weight="medium">
                Email address
              </Text>
              <TextField.Root
                placeholder="Enter your email address"
                name="email"
                type="email"
                required
                style={{ backgroundColor: "#FAFAFA" }}
                size="3"
              />
              {state?.errors?.email && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.email[0]}
                </Text>
              )}
            </Box>
            <Flex gap="5" className="flex-col md:flex-row">
              <Box className="flex-1 space-y-3">
                <Text size="4" weight="medium">
                  First name
                </Text>
                <TextField.Root
                  placeholder="Enter your first name"
                  name="firstName"
                  required
                  style={{ backgroundColor: "#FAFAFA" }}
                  size="3"
                />
                {state?.errors?.firstName && (
                  <Text size="2" weight="bold" className="text-red-500" as="p">
                    {state.errors.firstName[0]}
                  </Text>
                )}
              </Box>
              <Box className="flex-1 space-y-3">
                <Text size="4" weight="medium">
                  Last name
                </Text>
                <TextField.Root
                  placeholder="Enter your last name"
                  name="lastName"
                  required
                  style={{ backgroundColor: "#FAFAFA" }}
                  size="3"
                />
                {state?.errors?.lastName && (
                  <Text size="2" weight="bold" className="text-red-500" as="p">
                    {state.errors.lastName[0]}
                  </Text>
                )}
              </Box>
            </Flex>
            <PasswordField
              label="Password"
              placeholder="Enter your preferred password"
              hasError={!!state?.errors?.password}
              errorMessage={state?.errors?.password?.[0]}
            />
            <PasswordField
              label="Confirm password"
              name="confirmPassword"
              placeholder="Confirm your password"
              hasError={!!state?.errors?.confirmPassword}
              errorMessage={state?.errors?.confirmPassword?.[0]}
            />
            <Box className="space-y-3">
              <Flex direction="column">
                {role ? (
                  <input type="hidden" name="role" value={role} />
                ) : (
                  <>
                    <Text size="4" weight="medium">
                      Role
                    </Text>
                    <Select.Root name="role" required defaultValue={role || undefined} size="3">
                      <Select.Trigger
                        className="w-full"
                        style={{ backgroundColor: "#FAFAFA" }}
                        placeholder="Select your role"
                      />
                      <Select.Content position="popper">
                        <Select.Group role="form">
                          <Select.Item value="student">Student</Select.Item>
                          <Select.Item value="funder">Funder</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </>
                )}
              </Flex>
              {state?.errors?.role && (
                <Text size="2" weight="bold" className="text-red-500" as="p">
                  {state.errors.role[0]}
                </Text>
              )}
            </Box>
          </Box>
          <div className="space-y-8 py-6">
            <Button type="submit" className="w-full py-5" intent="primary" size="lg" disabled={pending}>
              {pending && <Spinner />}
              <span>{pending ? "Signing up..." : "Sign up"}</span>
            </Button>
            <Text size="6" weight="regular" align="center" as="p" className="text-[#888888]">
              By clicking sign up, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </div>
        </form>
      </main>
    </>
  )
}
