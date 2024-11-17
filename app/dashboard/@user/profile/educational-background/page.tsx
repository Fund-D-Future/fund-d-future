import { Box, Flex, Grid, Select, Text, TextField } from "@radix-ui/themes"
import { FileInput } from "components/shared"

export default function Page() {
  return (
    <Flex direction="column" gap="7" my="8">
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Current Institution
        </Text>
        <TextField.Root
          placeholder="Enter your current institution e.g. National Open University of Nigeria"
          name="currentInstitution"
          required
          style={{ backgroundColor: "white" }}
          size="3"
        />
      </Box>
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium">
          Degree Programme
        </Text>
        <Select.Root name="degreeProgramme" size="3" required>
          <Select.Trigger
            placeholder="Select degree of study"
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingBlock: "0.5rem",
              paddingInline: "0.75rem",
              display: "flex",
            }}
            color="green"
          />
          <Select.Content position="popper" style={{ maxHeight: "200px" }}>
            <Select.Item value="diploma">Diploma</Select.Item>
            <Select.Item value="associate">Associate</Select.Item>
            <Select.Item value="bachelor">Bachelor</Select.Item>
            <Select.Item value="master">Master</Select.Item>
            <Select.Item value="doctorate">Doctorate</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
      <Grid columns="3" gap="5" rows="repeat(2, 64px)" width="auto">
        <Box className="flex-1 space-y-2">
          <Text size="3" weight="medium">
            Course of Study
          </Text>
          <TextField.Root
            placeholder="Input course of study e.g. Computer Science"
            name="course"
            required
            style={{ backgroundColor: "white" }}
            size="3"
          />
        </Box>
        <Box className="flex-1 space-y-2">
          <Text size="3" weight="medium">
            Year of Study
          </Text>
          <Select.Root name="currentLevel" size="3" required>
            <Select.Trigger
              placeholder="Select year of study"
              style={{
                backgroundColor: "white",
                width: "100%",
                paddingBlock: "0.5rem",
                paddingInline: "0.75rem",
                display: "flex",
              }}
              color="green"
            />
            <Select.Content position="popper" style={{ maxHeight: "200px" }}>
              {Array.from({ length: 7 })
                .map((_, index) => `${index + 1}00L`)
                .map((year) => (
                  <Select.Item key={year} value={year}>
                    {year}
                  </Select.Item>
                ))}
            </Select.Content>
          </Select.Root>
        </Box>
        <Box className="flex-1 space-y-2">
          <Text size="3" weight="medium">
            GPA/Grade (Optional)
          </Text>
          <TextField.Root
            placeholder="Enter your GPA or grade"
            name="grade"
            style={{ backgroundColor: "white" }}
            size="3"
            type="number"
          />
        </Box>
        <FileInput name="courseProof" label="Upload Proof" icon="cloud-upload" />
        <FileInput name="currentLevelProof" label="Upload Proof" icon="cloud-upload" />
        <FileInput name="gradeProof" label="Upload Proof" icon="cloud-upload" />
      </Grid>
    </Flex>
  )
}
