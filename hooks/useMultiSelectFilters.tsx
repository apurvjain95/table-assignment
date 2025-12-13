import FilterIcon from "@/assets/images/icons/FilterIcon";
import { Checkbox, DropdownMenu, IconButton } from "@radix-ui/themes";
import { useState } from "react";

const useMultiSelectFilter = ({
  key,
  possibleOptions,
}: {
  key: string;
  possibleOptions: { label: string; value: string }[];
}) => {
  const [filteredValues, setFilteredValues] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] =
    useState<boolean>(false);

  const toggleFilterValue = (value: string) => {
    setFilteredValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  const FilterDropdown = () => {
    return (
      <DropdownMenu.Root
        open={isFilterDropdownOpen}
        onOpenChange={setIsFilterDropdownOpen}
      >
        <DropdownMenu.Trigger>
          <IconButton
            variant="ghost"
            color={!filteredValues.length ? "gray" : "purple"}
            className="size-4 cursor-pointer"
          >
            <FilterIcon className="size-4" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-40">
          {possibleOptions.map((option) => (
            <div
              key={option.value}
              className="rt-reset rt-BaseMenuItem rt-DropdownMenuItem flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={filteredValues.includes(option.value)}
                value={option.value}
                onClick={() => toggleFilterValue(option.value)}
                id={option.value}
              />{" "}
              <label htmlFor={option.value} className="text-body-xs-medium">
                {option.label}
              </label>
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  };

  return {
    filterObject: {
      key,
      values: filteredValues,
    },
    FilterDropdown,
  };
};

export default useMultiSelectFilter;
