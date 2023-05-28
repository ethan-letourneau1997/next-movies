import { Box, RangeSlider, Text } from "@mantine/core";

import { runtimeMarks } from "../../../../data/discoverData";
import { useStore } from "@/store/store";

interface GenreTypes {
  desktop: boolean;
}

export default function Runtime({ desktop }: GenreTypes) {
  const [runtimeValue, setRuntimeValue] = useStore((state) => [
    state.runtimeSliderValue,
    state.updateRuntimeSliderValue,
  ]);
  return (
    <Box px="md">
      <Text fw={desktop ? 300 : 500} fz={desktop ? "md" : "md"}>
        Runtime
      </Text>

      <Box mt="sm">
        <RangeSlider
          thumbSize={10}
          showLabelOnHover
          label={(value) => `${value} min`}
          color="indigo"
          step={25}
          size="xs"
          min={50}
          max={350}
          value={runtimeValue}
          onChange={setRuntimeValue}
          marks={runtimeMarks}
          styles={(theme) => ({
            label: {
              backgroundColor: theme.colors.brand[8],
            },
            markLabel: {
              marginTop: 3,
              fontSize: theme.fontSizes.xs,
            },
          })}
        />
      </Box>
    </Box>
  );
}
