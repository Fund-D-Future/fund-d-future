"use client"

import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import { IconName, Logo, LucideIcon } from "components/shared"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export type SidebarItem = {
  category: "Main Menu" | "Others"
  label: string
  icon: IconName
  href: string
}

type DynamicSidebarProps = {
  items: SidebarItem[]
  mmi?: number // Max Mobile Items
}

const categorize = (items: SidebarItem[]) => {
  return items.reduce(
    (acc, item, index) => {
      if (!acc[item.category]) {
        acc[item.category] = { index, items: [] }
      }

      acc[item.category]!.items.push(item)
      return acc
    },
    {} as Record<
      string,
      {
        index: number
        items: SidebarItem[]
      }
    >
  )
}

export default function Sidebar({ items, mmi = 5 }: DynamicSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    // If we're on /dashboard/profile, we don't want /dashboard to be active
    const moreSpecificRouteExists = items.some(
      (item) =>
        item.href !== href && // not the current item
        item.href.startsWith(href) && // is a child route of current item
        pathname.startsWith(item.href) // and matches current pathname
    )

    // If a more specific route exists and matches current path,
    // this less specific route should not be active
    if (moreSpecificRouteExists) return false

    // Otherwise, check if this route matches the current path
    return pathname === href || pathname.startsWith(href + "/")
  }

  // Split items into revealed and hidden items (for mobile)
  const revealedItems = items.slice(0, mmi - 1)
  const hiddenItems = items.slice(mmi - 1)
  const hasHiddenItems = hiddenItems.length > 0

  // Group the items based on their categories before rendering it
  const categories = useMemo(() => categorize(items), [items])

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-5 bottom-5 z-50 mx-auto flex max-w-xl items-center rounded-full bg-[#056434] px-6 shadow-md sm:bottom-10 md:hidden">
        <Flex
          direction="row"
          align="center"
          justify="between"
          className="h-16 gap-2 py-1 sm:h-24 sm:gap-5"
          width="100%"
        >
          {revealedItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={`rounded-full ${
                isActive(item.href) ? "bg-[#00CF68]" : ""
              } flex size-8 items-center justify-center sm:size-14`}
            >
              <LucideIcon name={item.icon} className="size-4 sm:size-6" color="white" />
            </Link>
          ))}
          {/* Hidden menu items togglable with the dropdown */}
          {hasHiddenItems && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button
                  variant="ghost"
                  className="flex size-8 items-center justify-center rounded-full outline-none sm:size-14"
                >
                  <LucideIcon name="ellipsis-vertical" className="size-4 sm:size-6" color="white" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={5} variant="soft">
                <DropdownMenu.Group>
                  <DropdownMenu.Label>Others</DropdownMenu.Label>
                  {hiddenItems.map((item) => (
                    <DropdownMenu.Item key={item.label} asChild color="green">
                      <Link
                        href={item.href}
                        className={`${
                          isActive(item.href) ? "bg-[#00CF68]" : ""
                        } flex size-8 items-center justify-center sm:size-14`}
                      >
                        <LucideIcon name={item.icon} className="size-4 sm:size-6" color="green" />
                        <Text weight="medium" className="ml-2 text-[#056434]">
                          {item.label}
                        </Text>
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>
      </nav>

      {/* Desktop Side Navigation */}
      <aside className="m-5 hidden w-64 flex-col gap-5 rounded-xl bg-white px-5 py-10 md:flex lg:w-80">
        <Logo />
        <nav className="mt-5 flex flex-col gap-8">
          {Object.entries(categories).map(([category, { items: catItems }]) => (
            <div key={category} className="space-y-2">
              <Text size="2" className="uppercase text-[#777777]">
                {category}
              </Text>
              <Flex direction="column" gap="3">
                {catItems.map((item) => {
                  const active = isActive(item.href)

                  return (
                    <Link
                      href={item.href}
                      key={item.label}
                      className={`flex w-full items-center ${
                        active ? "bg-[#00CF68]" : "bg-[#FAFAFA]"
                      } h-10 gap-3 rounded-lg px-5 transition-colors lg:h-14 lg:rounded-2xl`}
                    >
                      <LucideIcon
                        name={item.icon}
                        color={active ? "#fff" : "#777777"}
                        fill={active ? "#fff" : undefined}
                        fillOpacity={active ? 0.5 : undefined}
                        className="size-4"
                      />
                      <Text
                        weight={active ? "bold" : "medium"}
                        className={`${active ? "text-white" : "text-[#333]"} lg:text-medium text-base`}
                      >
                        {item.label}
                      </Text>
                    </Link>
                  )
                })}
              </Flex>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
