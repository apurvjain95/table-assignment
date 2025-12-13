interface SortObject {
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

interface Filter {
  key: string;
  values: string[];
}

export type { SortObject, Filter };
