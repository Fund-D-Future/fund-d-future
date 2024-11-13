"use client"

import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import { IconName, LucideIcon } from "components/shared"
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

  // Check if the current path matches the item's href
  const isActive = (href: string) => {
    return pathname === href
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
        <header className="flex items-center gap-2">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.06266 13.2801H8.05066C7.18799 13.8756 6.31755 14.481 5.43933 15.0961C5.41866 15.1095 5.39622 15.1201 5.37266 15.1274C5.33266 15.1394 5.30599 15.1587 5.26599 15.1627C5.23091 15.1711 5.19408 15.1683 5.16066 15.1547C5.13513 15.1426 5.10885 15.1322 5.08199 15.1234C5.0543 15.1109 5.02814 15.0952 5.00399 15.0767L2.25866 13.1821C2.20448 13.1461 2.16316 13.0938 2.14066 13.0327C2.12536 12.9899 2.11747 12.9448 2.11733 12.8994V4.05606C2.11602 4.01547 2.124 3.97511 2.14066 3.93806C2.15801 3.89244 2.19144 3.85474 2.23466 3.83206L2.30533 3.7894L5.05066 1.88673C5.16399 1.80873 5.28599 1.82006 5.39599 1.89473L7.97266 3.69873L7.98466 3.6914L10.6553 1.90273C10.7024 1.86741 10.7598 1.84864 10.8187 1.84937C10.8775 1.85009 10.9345 1.87026 10.9807 1.90673L13.754 3.82473C13.7927 3.84806 13.8827 3.91473 13.8827 3.9654V13.1507C13.8825 13.1563 13.8809 13.1616 13.8781 13.1664C13.8753 13.1712 13.8714 13.1752 13.8667 13.1781L11.1067 15.0881C11.0798 15.1053 11.0506 15.1185 11.02 15.1274C10.9413 15.1547 10.898 15.1781 10.812 15.1547L10.7967 15.1467C10.7807 15.1267 10.7613 15.1354 10.7413 15.1267C9.84902 14.5084 8.9548 13.8928 8.05866 13.2801H8.06266ZM10.6907 5.75006L13.1067 4.0714L13.11 4.0674L13.112 4.06006C13.112 4.05651 13.1113 4.05384 13.11 4.05206L13.1067 4.04406L10.82 2.4754H10.804L8.13333 4.2634C8.0867 4.29929 8.02951 4.31876 7.97066 4.31876C7.91182 4.31876 7.85462 4.29929 7.80799 4.2634L5.22666 2.4754C5.22388 2.473 5.22033 2.47169 5.21666 2.47169C5.21299 2.47169 5.20944 2.473 5.20666 2.4754L2.92533 4.04406C2.92271 4.04469 2.92038 4.04619 2.91871 4.0483C2.91704 4.05042 2.91614 4.05304 2.91614 4.05573C2.91614 4.05842 2.91704 4.06104 2.91871 4.06316C2.92038 4.06527 2.92271 4.06677 2.92533 4.0674L5.38799 5.7774C5.43793 5.8176 5.47368 5.87274 5.48999 5.93473C5.52133 6.04006 5.46266 6.17006 5.37666 6.22806C4.55867 6.8036 3.73866 7.37627 2.91666 7.94606L2.92133 7.95006L5.22733 9.55006C6.0891 8.93851 6.95177 8.32806 7.81533 7.71873C7.89399 7.66006 8.01199 7.68006 8.10199 7.68006C8.11035 7.68001 8.11851 7.68258 8.12533 7.6874C8.15266 7.7074 8.18399 7.7074 8.21199 7.72673C9.08222 8.33206 9.95155 8.93873 10.82 9.54673L13.11 7.95406V7.94673C13.1109 7.94487 13.1114 7.94282 13.1114 7.94073C13.1114 7.93865 13.1109 7.93659 13.11 7.93473V7.93073C12.2882 7.36184 11.4673 6.79184 10.6473 6.22073C10.5687 6.16206 10.51 6.05206 10.5293 5.95806C10.5406 5.91399 10.5608 5.8727 10.5887 5.83673C10.616 5.80123 10.6491 5.77058 10.6867 5.74606L10.6907 5.75006ZM2.70133 7.3934L4.70133 6.00473L4.70399 6.00206V5.99606L4.70199 5.9934L2.70199 4.60873C2.68999 4.60073 2.68599 4.60073 2.68999 4.61673L2.69733 4.6794C2.69866 5.58384 2.69866 6.48851 2.69733 7.3934H2.70133ZM4.85866 10.0054L2.69733 8.49206L2.68999 8.4954V8.55406C2.69666 9.96873 2.6991 11.3834 2.69733 12.7981L2.70933 12.8094L4.85466 14.3074L4.86266 14.3041V10.0054H4.85866ZM10.7453 10.1621L10.7413 10.1547L8.38799 8.53873V12.8367L10.7293 14.4647H10.7453L10.7493 14.4567V10.1581L10.7453 10.1621Z"
              fill="#00CF68"
            />
          </svg>
          <Text size="4" className="font-extrabold text-[#00CF68]">
            FundDfuture
          </Text>
        </header>
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
