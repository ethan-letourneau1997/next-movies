import { Box, Flex, Text } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";

import { IconCalendarTime } from "@tabler/icons-react";

interface CheckBoxTypes {
  desktop: boolean;
  checkedAll: boolean;
  startDate: Date | null;
  endDate: Date;
  handleStartDateChange: (value: DateValue) => void;
  handleEndDateChange: (value: DateValue) => void;
}

export default function DatePickers({
  desktop,
  checkedAll,
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}: CheckBoxTypes) {
  return (
    <Box px="md">
      <Text fw={desktop ? 300 : 500} fz={desktop ? "md" : "md"}>
        Release Dates
      </Text>
      <Flex mt="sm">
        <Text c="dimmed" fz="sm" w="25%" my="auto">
          From
        </Text>
        <DatePickerInput
          disabled={!checkedAll}
          icon={<IconCalendarTime size={16} stroke={1.5} />}
          defaultLevel="decade"
          value={startDate}
          onChange={handleStartDateChange}
          mx="auto"
          styles={(theme) => ({
            label: {
              backgroundColor: theme.colors.brand[8],
            },
            markLabel: {
              fontSize: theme.fontSizes.xs,
            },
          })}
          sx={{
            flexGrow: 1,
          }}
        />
      </Flex>

      <Flex mt="md">
        <Text c="dimmed" fz="sm" w="25%" my="auto">
          To
        </Text>
        <DatePickerInput
          disabled={!checkedAll}
          icon={<IconCalendarTime size={16} stroke={1.5} />}
          defaultLevel="year"
          value={endDate}
          onChange={handleEndDateChange}
          mx="auto"
          sx={{
            flexGrow: 1,
          }}
        />
      </Flex>
    </Box>
  );
}
