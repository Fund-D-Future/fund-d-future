import { Badge, Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { X } from "lucide-react"

export default function Page() {
  const profile = {
    shortTermGoals: ["Passing Exams", "Getting a Job"] as string[],
    longTermGoals: [] as string[],
    volunteerWorkBackground: "",
  }

  return (
    <Flex direction="column" gap="7" my="8">
      <Box className="flex-1 space-y-3">
        <Text size="3" weight="medium">
          Short-Term Goals
        </Text>
        <Flex align="stretch" gap="3">
          {profile.shortTermGoals.map((goal, index) => (
            <Badge
              key={index}
              variant="soft"
              color="green"
              radius="full"
              className="flex items-center gap-3"
              size="3"
              style={{ padding: "0.4rem 0.8rem" }}
            >
              <Text size="1" weight="bold">
                {goal}
              </Text>
              <Button variant="ghost" color="green" size="1" className="font-bold">
                <X size={16} />
              </Button>
            </Badge>
          ))}
          <TextField.Root
            placeholder="Type to add new"
            name="shortTermGoal"
            variant="soft"
            style={{ border: "none", fontWeight: 700, padding: "0.5rem" }}
            color="green"
            radius="full"
            size="2"
          />
        </Flex>
      </Box>
      <Box className="flex-1 space-y-3">
        <Text size="3" weight="medium">
          Long-Term Goals
        </Text>
        <Flex align="stretch" gap="3">
          {profile.longTermGoals.map((goal, index) => (
            <Badge
              key={index}
              variant="soft"
              color="green"
              radius="full"
              className="flex items-center gap-3"
              size="3"
              style={{ padding: "0.4rem 0.8rem" }}
            >
              <Text size="1" weight="bold">
                {goal}
              </Text>
              <Button variant="ghost" color="green" size="1" className="font-bold">
                <X size={16} />
              </Button>
            </Badge>
          ))}
          <TextField.Root
            placeholder="Type to add new"
            name="longTermGoal"
            variant="soft"
            style={{ border: "none", fontWeight: 700, padding: "0.5rem" }}
            color="green"
            radius="full"
            size="2"
          />
        </Flex>
      </Box>
      <Box className="flex-1 space-y-3">
        <Text size="3" weight="medium">
          Extra-Curricular Activities/Volunteer Work
        </Text>
        <TextArea
          placeholder="Tell us more about your extra-Curricular Activities/Volunteer Work"
          name="volunteerWorkBackground"
          style={{ backgroundColor: "white", border: "none", width: "100%" }}
          radius="large"
          color="green"
          size="3"
          rows={5}
        />
      </Box>
    </Flex>
  )
}
