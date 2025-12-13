import Fuse from "fuse.js";
import { Filter, SortObject } from "@/models/Generic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFrontendFilteredContent = <T extends Record<string, any>>(
  content: T[],
  appliedFiltersString: string
) => {
  const appliedFiltersObject: { filters: Filter[] } = JSON.parse(
    appliedFiltersString || "{}"
  );
  const applicableFilters =
    appliedFiltersObject?.filters?.reduce((finalFtr, ftr) => {
      if (ftr.values.length > 0) {
        finalFtr.push({
          key: ftr.key,
          values: ftr.values,
        });
      }
      return finalFtr;
    }, [] as Filter[]) || [];
  const filteredContent = content.filter((obj) => {
    return applicableFilters.every(({ key, values }) => {
      return values.length > 0 ? values.includes(obj[key]) : true;
    });
  });

  return filteredContent;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFrontendSortedContent = <T extends Record<string, any>>(
  content: T[],
  sortObject: SortObject
) => {
  return [...content].sort((a, b) => {
    return sortObject.sortOrder === "ASC"
      ? a[sortObject.sortBy] - b[sortObject.sortBy]
      : b[sortObject.sortBy] - a[sortObject.sortBy];
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFrontendSortedAndFilteredContent = <T extends Record<string, any>>(
  content: T[],
  sortObject: SortObject,
  appliedFiltersString: string
) => {
  const sortedContent = getFrontendSortedContent(content, sortObject);
  const filteredContent = getFrontendFilteredContent(
    sortedContent,
    appliedFiltersString
  );
  return filteredContent;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzySearchOnFields = <T extends Record<string, any>>(
  data: T[],
  searchQuery: string,
  ...searchFields: string[]
) => {
  if (!searchQuery) {
    return data;
  }
  const fuse = new Fuse(data, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    keys: searchFields,
    threshold: 0.3,
  });
  return fuse.search(searchQuery).map((result) => result.item);
};

export {
  getFrontendFilteredContent,
  getFrontendSortedContent,
  getFrontendSortedAndFilteredContent,
  fuzzySearchOnFields,
};
