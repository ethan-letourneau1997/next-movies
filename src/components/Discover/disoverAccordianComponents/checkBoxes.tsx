import { Box, Checkbox, Divider, SimpleGrid, Stack, Text } from "@mantine/core";

import { WatchProvider } from "../../../../types";

interface CheckBoxTypes {
  handleProviderClick: (value: string) => void;
  providers: WatchProvider[];
  desktop: boolean;
  checkedAll: boolean;
  checkedNowPlaying: boolean;
  checkedUpcoming: boolean;
  toggleAll: () => void;
  toggleNowPlaying: () => void;
  toggleUpcoming: () => void;
  certifications: string[];
  setCertifications: (value: string[]) => void;
}

export default function Checkboxes({
  desktop,
  checkedAll,
  checkedNowPlaying,
  checkedUpcoming,
  toggleAll,
  toggleNowPlaying,
  toggleUpcoming,
  certifications,
  setCertifications,
}: CheckBoxTypes) {
  return (
    <Box>
      <Box px="md">
        <Text fw={desktop ? 300 : 500} fz={desktop ? "md" : "md"}>
          Show Me
        </Text>
        <Stack mt="sm">
          <Checkbox
            color="indigo"
            label="All"
            checked={checkedAll}
            onChange={checkedAll ? undefined : toggleAll}
          />
          <Checkbox
            color="indigo"
            label="Now Playing"
            checked={checkedNowPlaying}
            onChange={checkedNowPlaying ? undefined : toggleNowPlaying}
          />
          <Checkbox
            color="indigo"
            label="Upcoming"
            checked={checkedUpcoming}
            onChange={checkedUpcoming ? undefined : toggleUpcoming}
          />
        </Stack>
      </Box>
      <Divider my="lg"></Divider>{" "}
      <Box px="md" pb="xl">
        <Text fw={desktop ? 300 : 500} fz={desktop ? "md" : "md"}>
          Age Ratings
        </Text>
        <Checkbox.Group
          value={certifications}
          onChange={setCertifications}
          label=""
          description=""
          withAsterisk
        >
          <SimpleGrid cols={2} mt="sm">
            {/* Render the checkboxes for each certification */}
            <Checkbox color="indigo" value="G" label="G" />
            <Checkbox color="indigo" value="R" label="R" />
            <Checkbox color="indigo" value="PG" label="PG" />
            <Checkbox color="indigo" value="NC-17" label="NC-17" />
            <Checkbox color="indigo" value="PG-13" label="PG-13" />
            <Checkbox color="indigo" value="NR" label="NR" />
          </SimpleGrid>
        </Checkbox.Group>
      </Box>
    </Box>
  );
}
