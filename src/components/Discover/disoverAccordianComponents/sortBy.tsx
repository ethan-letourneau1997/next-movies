import { Select } from "@mantine/core";
import { SelectProps } from "@mantine/core";

interface SortByProps {
  handleSortBy: (value: string) => void;
  sortByData: SelectProps["data"];
  desktop: boolean;
}

export default function SortBy({
  handleSortBy,
  sortByData,
  desktop,
}: SortByProps) {
  return (
    <Select
      label="Sort Results By"
      size={desktop ? "sm" : "sm"}
      defaultChecked
      defaultValue="popularity"
      placeholder="Pick one"
      onChange={(value) => handleSortBy(value ?? "")}
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
