import { TableDataHealth, TableDataLocation } from "@/enums/TableData";

interface TableDataRow {
  id: string;
  name: string;
  location: keyof typeof TableDataLocation;
  health: keyof typeof TableDataHealth;
  power: number;
}

export type { TableDataRow };
