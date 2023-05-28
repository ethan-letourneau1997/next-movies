import { Select } from "@mantine/core";
import { sortByData } from "../../../../data/discoverData";
import { useStore } from "@/store/store";

interface SortByProps {
  desktop: boolean;
}

export default function SortBy({ desktop }: SortByProps) {
  const [sortBy, updateSortBy] = useStore((state) => [
    state.sortBy,
    state.updateSortBy,
  ]);
  return (
    <Select
      label="Sort Results By"
      size={desktop ? "sm" : "sm"}
      defaultChecked
      defaultValue="popularity"
      placeholder="Pick one"
      onChange={(value) => updateSortBy(value ?? "")}
      data={sortByData}
      styles={(theme) => ({
        label: {
          fontSize: desktop ? theme.fontSizes.md : theme.fontSizes.md,
          fontWeight: 300,
          marginBottom: 8,
        },
      })}
    />
  );
}
