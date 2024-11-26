import { Avatar, Box, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { LocationSelector } from "components/shared"
import { Camera } from "lucide-react"

export default function Page() {
  return (
    <Flex direction="column" gap="7" my="8">
      <Box my="2" position="relative" width="max-content">
        <Avatar size="8" radius="full" variant="soft" fallback="ST" className="border border-[#00CF68]" color="green" />
        <label
          htmlFor="avatar"
          className="absolute bottom-2 right-1 cursor-pointer rounded-full bg-[#00CF68] px-2 py-1"
        >
          <Camera size={20} color="white" />
          <input type="file" id="avatar" className="hidden" accept="image/*" />
        </label>
      </Box>

      <Flex align="center" justify="between" gap="4">
        <Box className="flex-1 space-y-2">
          <Text size="3" weight="medium">
            First Name
          </Text>
          <TextField.Root
            placeholder="Enter your first name"
            name="firstname"
            required
            style={{ backgroundColor: "white" }}
            size="3"
          />
        </Box>
        <Box className="flex-1 space-y-2">
          <Text size="3" weight="medium">
            Last Name
          </Text>
          <TextField.Root
            placeholder="Enter your last name"
            name="lastname"
            required
            style={{ backgroundColor: "white" }}
            size="3"
          />
        </Box>
      </Flex>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Bio
        </Text>
        <TextArea
          placeholder="Introduce yourself and share a bit about your story and aspirations."
          name="bio"
          required
          rows={8}
          style={{ backgroundColor: "white" }}
        />
      </Box>
      <LocationSelector />
    </Flex>
  )
}
