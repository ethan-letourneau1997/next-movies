import { Radio, Stack } from "@mantine/core";

import { useStore } from "@/store/store";

export function ShowMe() {
  const [showMe, updateShowMeValue] = useStore((state) => [
    state.showMeValue,
    state.updateShowMeValue,
  ]);

  return (
    <Radio.Group
      name="showMe"
      label="Show me"
      value={showMe}
      onChange={updateShowMeValue}
    >
      <Stack>
        <Radio value="all" label="all"></Radio>
        <Radio value="nowPlaying" label="nowPlaying"></Radio>
        <Radio value="upcoming" label="upcoming"></Radio>
      </Stack>
    </Radio.Group>
  );
}
