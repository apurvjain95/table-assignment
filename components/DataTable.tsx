"use client";

import LineLoader from "@/components/global/LineLoader";
import SortArrows from "@/components/global/SortArrows";
import tableData from "@/data/tabledata";
import useMultiSelectFilter from "@/hooks/useMultiSelectFilters";
import useSearch from "@/hooks/useSearch";
import { SortObject } from "@/models/Generic";
import { TableDataRow, TableDataRowWithSerialNumber } from "@/models/TableData";
import {
  fuzzySearchOnFields,
  getFrontendSortedAndFilteredContent,
} from "@/utils/filters";
import { Button, Checkbox, Table } from "@radix-ui/themes";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState<TableDataRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [sortObject, setSortObject] = useState<SortObject>({
    sortBy: "power",
    sortOrder: "ASC",
  });

  const setSorting = (sortBy: string) => {
    setSortObject((prev) => {
      if (prev.sortOrder === "DESC") {
        return {
          sortBy,
          sortOrder: "ASC",
        };
      }
      return {
        sortBy,
        sortOrder: "DESC",
      };
    });
  };

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows((prev) => [...prev, id]);
    }
  };

  const toggleAllRowsSelection = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  const getData = async () => {
    try {
      setDataLoading(true);
      const completeData = tableData;
      // if I do not add setTimeout, then data will be set immediately but loader would still appear
      // thus when the loader goes away, it would feel like the data has not updated.
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(completeData), 1000)
      );
      const filteredSortedData = getFrontendSortedAndFilteredContent(
        response as TableDataRow[],
        sortObject,
        filtersString
      );
      const searchedData = fuzzySearchOnFields(
        filteredSortedData as TableDataRow[],
        search,
        "name",
        "location"
      );
      setData(searchedData as TableDataRow[]);
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
    } finally {
      // setTimeout added to simulate data loading
      // otherwise loader will not be visible in our case since data is already present locally
      setDataLoading(false);
    }
  };

  const {
    filterObject: healthFilterObject,
    FilterDropdown: HealthFilterDropdown,
  } = useMultiSelectFilter({
    key: "health",
    possibleOptions: [
      { label: "Healthy", value: "Healthy" },
      { label: "Injured", value: "Injured" },
      { label: "Critical", value: "Critical" },
    ],
  });

  const {
    filterObject: locationFilterObject,
    FilterDropdown: LocationFilterDropdown,
  } = useMultiSelectFilter({
    key: "location",
    possibleOptions: [
      { label: "Konoha", value: "Konoha" },
      { label: "Suna", value: "Suna" },
      { label: "Kiri", value: "Kiri" },
      { label: "Iwa", value: "Iwa" },
      { label: "Kumo", value: "Kumo" },
    ],
  });

  const filtersString = useMemo(() => {
    return JSON.stringify({
      filters: [healthFilterObject, locationFilterObject],
    });
  }, [healthFilterObject, locationFilterObject]);

  const { search, SearchComponent } = useSearch("Search by name or location");

  useEffect(() => {
    getData();
  }, [sortObject, filtersString, search]);

  const handleSubmit = () => {
    console.log("selectedRows", selectedRows.toString());
  };

  const columns = [
    {
      id: "checkbox-container",
      name: "Checkbox",
      key: (row: TableDataRowWithSerialNumber) =>
        `checkbox-container-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="checkbox-container-header"
          className="align-middle pr-1 w-12 max-w-12"
        >
          <Checkbox
            className="cursor-pointer"
            checked={selectedRows.length === data.length && data.length > 0}
            onClick={toggleAllRowsSelection}
            aria-label="Select row"
          />
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.RowHeaderCell
          key={`checkbox-container-${row.id}`}
          className="align-middle pr-1 w-12 max-w-12"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            className="cursor-pointer h-5"
            checked={selectedRows.includes(row.id)}
            onClick={() => {
              toggleRowSelection(row.id);
            }}
            aria-label="Select row"
          />
        </Table.RowHeaderCell>
      ),
    },
    {
      id: "sl-no-container",
      name: "Sl.",
      notRequiredInConfig: true,
      key: (row: TableDataRowWithSerialNumber) => `sl-no-container-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="sl-no-container-header"
          className="pl-1.5 pr-1 text-center text-body-xs-medium w-12 max-w-12"
        >
          Sl.
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`sl-no-container-${row.id}`}
          className="align-middle pl-1.5 pr-1 text-text-neutral-subdued text-center text-body-xs-medium w-12 max-w-12"
        >
          {row.serialNumber}
        </Table.Cell>
      ),
    },
    {
      id: "name",
      name: "Name",
      notRequiredInConfig: true,
      key: (row: TableDataRowWithSerialNumber) => `name-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="name-header"
          className="pl-2 pr-2 text-body-xs-medium"
        >
          Name
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell key={`name-${row.id}`} className="align-middle pl-2 pr-2">
          <div className="flex flex-col justify-center items-start gap-1 h-full w-56 max-w-56">
            <div
              className="flex gap-1.5 items-center max-w-56 overflow-hidden text-ellipsis text-nowrap"
              title={row.name}
            >
              {row.name}
            </div>
          </div>
        </Table.Cell>
      ),
    },
    {
      id: "location",
      name: "Location",
      key: (row: TableDataRowWithSerialNumber) => `location-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="location-header"
          className="text-body-xs-medium"
        >
          <div className="flex items-center gap-3">
            Location
            <LocationFilterDropdown />
          </div>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell key={`location-${row.id}`} className="align-middle">
          <div className="flex flex-col justify-center items-start gap-1 h-full w-33 max-w-33">
            {row.location}
          </div>
        </Table.Cell>
      ),
    },
    {
      id: "health",
      name: "Health",
      key: (row: TableDataRowWithSerialNumber) => `health-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="health-header"
          className="text-body-xs-medium"
        >
          <div className="flex items-center gap-3">
            Health <HealthFilterDropdown />
          </div>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell key={`health-${row.id}`} className="align-middle">
          <div className="flex flex-col justify-center items-start gap-1 h-full w-33 max-w-33">
            {row.health}
          </div>
        </Table.Cell>
      ),
    },
    {
      id: "power",
      name: "Power",
      key: (row: TableDataRowWithSerialNumber) => `power-${row.id}`,
      header: () => (
        <Table.ColumnHeaderCell
          key="power-header"
          className="text-body-xs-medium"
        >
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setSorting("power")}
          >
            Power{" "}
            {sortObject && (
              <SortArrows sortObject={sortObject} sortKey="power" />
            )}
          </div>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell key={`power-${row.id}`} className="align-middle">
          <div className="flex flex-col justify-center items-start gap-1 h-full w-33 max-w-33">
            {row.power}
          </div>
        </Table.Cell>
      ),
    },
  ];

  const tableRowClassName = (row: TableDataRow) =>
    classNames("h-fit cursor-pointer", {
      "opacity-40": dataLoading,
      "bg-surface-neutral-default": selectedRows.includes(row.id),
    });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-1 gap-4 justify-between items-center">
        <div className="w-96">
          <SearchComponent />
        </div>
        <Button
          disabled={dataLoading || selectedRows.length === 0}
          onClick={handleSubmit}
          className="cursor-pointer"
        >
          Submit
        </Button>
      </div>
      <Table.Root className="w-full border border-border-neutral-default rounded-md overflow-hidden">
        <Table.Header className="bg-surface-neutral-default">
          <Table.Row className="text-text-neutral-subdued">
            {columns.map((column) => column.header())}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataLoading && (
            <Table.Row className="h-fit">
              <Table.Cell
                colSpan={columns.length}
                className="p-0 h-fit shadow-none"
              >
                <LineLoader />
              </Table.Cell>
            </Table.Row>
          )}
          {data?.map((row, idx) => (
            <Table.Row key={`row-${row.id}`} className={tableRowClassName(row)}>
              {columns.map((column) =>
                column.body({
                  ...row,
                  serialNumber: idx + 1,
                })
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default DataTable;
