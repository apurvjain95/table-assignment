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
    const activeFiltersText =
      filteredValues.length > 0
        ? `${filteredValues.length} ${filteredValues.length === 1 ? "filter" : "filters"} active`
        : "No filters active";

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
            aria-label={`Filter ${key}. ${activeFiltersText}`}
            aria-expanded={isFilterDropdownOpen}
            aria-haspopup="menu"
          >
            <FilterIcon className="size-4" aria-hidden="true" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className="w-40"
          role="menu"
          aria-label={`${key} filter options`}
        >
          {possibleOptions.map((option) => (
            <div
              key={option.value}
              className="rt-reset rt-BaseMenuItem rt-DropdownMenuItem flex items-center gap-2 cursor-pointer"
              role="menuitemcheckbox"
              aria-checked={filteredValues.includes(option.value)}
            >
              <Checkbox
                checked={filteredValues.includes(option.value)}
                value={option.value}
                onClick={() => toggleFilterValue(option.value)}
                id={`${key}-${option.value}`}
                aria-label={`Filter by ${option.label}`}
              />{" "}
              <label
                htmlFor={`${key}-${option.value}`}
                className="text-body-xs-medium cursor-pointer"
              >
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
