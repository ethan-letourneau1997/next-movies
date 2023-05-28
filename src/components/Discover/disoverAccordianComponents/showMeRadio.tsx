import { Radio, Stack } from "@mantine/core";

import { useStore } from "@/store/store";

export function ShowMe() {
  const [showMe, updateShowMeValue] = useStore((state) => [
    state.showMeValue,
    state.updateShowMeValue,
  ]);

  return (
    <Radio.Group
      description="Select 'All' to access all filters."
      name="showMe"
      label="Show me"
      value={showMe}
      onChange={updateShowMeValue}
    >
      <Stack>
        <Radio color="indigo" value="all" label="all"></Radio>
        <Radio color="indigo" value="nowPlaying" label="nowPlaying"></Radio>
        <Radio color="indigo" value="upcoming" label="upcoming"></Radio>
      </Stack>
    </Radio.Group>
  );
}
