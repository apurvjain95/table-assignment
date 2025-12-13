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
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button, Checkbox, Table } from "@radix-ui/themes";
import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState<TableDataRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [sortObject, setSortObject] = useState<SortObject>({
    sortBy: "power",
    sortOrder: "ASC",
  });

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Ref for the header scroll container
  const headerScrollContainerRef = useRef<HTMLDivElement>(null);

  // Ref for screen reader announcements
  const announcementRef = useRef<HTMLDivElement>(null);

  const setSorting = (sortBy: string) => {
    setSortObject((prev) => {
      const newOrder = prev.sortOrder === "DESC" ? "ASC" : "DESC";

      // Announce to screen readers
      if (announcementRef.current) {
        announcementRef.current.textContent = `Table sorted by ${sortBy} in ${newOrder === "ASC" ? "ascending" : "descending"} order`;
      }

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
    const rowData = data.find((row) => row.id === id);
    if (selectedRows.includes(id)) {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      if (announcementRef.current && rowData) {
        announcementRef.current.textContent = `${rowData.name} deselected`;
      }
    } else {
      setSelectedRows((prev) => [...prev, id]);
      if (announcementRef.current && rowData) {
        announcementRef.current.textContent = `${rowData.name} selected`;
      }
    }
  };

  const toggleAllRowsSelection = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      if (announcementRef.current) {
        announcementRef.current.textContent = "All rows deselected";
      }
    } else {
      setSelectedRows(data.map((row) => row.id));
      if (announcementRef.current) {
        announcementRef.current.textContent = `All ${data.length} rows selected`;
      }
    }
  };

  const getData = async () => {
    try {
      setDataLoading(true);
      if (announcementRef.current) {
        announcementRef.current.textContent = "Loading table data";
      }
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
      if (announcementRef.current) {
        announcementRef.current.textContent = `Table loaded with ${searchedData.length} rows`;
      }
    } catch (error) {
      console.error(error);
      if (announcementRef.current) {
        announcementRef.current.textContent = "Error loading table data";
      }
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

  // Set up virtualizer for efficient rendering
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 60, // Estimated row height in pixels
    overscan: 5, // Number of items to render outside visible area
  });

  useEffect(() => {
    getData();
  }, [sortObject, filtersString, search]);

  // Sync horizontal scroll between header and body
  useEffect(() => {
    const headerContainer = headerScrollContainerRef.current;
    const bodyContainer = scrollContainerRef.current;

    if (!headerContainer || !bodyContainer) return;

    let isScrollingBody = false;
    let isScrollingHeader = false;

    const syncHeaderScroll = () => {
      if (isScrollingHeader) return;
      isScrollingBody = true;
      requestAnimationFrame(() => {
        if (headerContainer) {
          headerContainer.scrollLeft = bodyContainer.scrollLeft;
        }
        isScrollingBody = false;
      });
    };

    const syncBodyScroll = () => {
      if (isScrollingBody) return;
      isScrollingHeader = true;
      requestAnimationFrame(() => {
        if (bodyContainer) {
          bodyContainer.scrollLeft = headerContainer.scrollLeft;
        }
        isScrollingHeader = false;
      });
    };

    bodyContainer.addEventListener("scroll", syncHeaderScroll);
    headerContainer.addEventListener("scroll", syncBodyScroll);

    return () => {
      bodyContainer.removeEventListener("scroll", syncHeaderScroll);
      headerContainer.removeEventListener("scroll", syncBodyScroll);
    };
  }, []);

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
          className="align-middle pr-1"
          style={{ width: "28px", minWidth: "28px", maxWidth: "28px" }}
        >
          <Checkbox
            className="cursor-pointer"
            checked={selectedRows.length === data.length && data.length > 0}
            onClick={toggleAllRowsSelection}
            aria-label={
              selectedRows.length === data.length && data.length > 0
                ? "Deselect all rows"
                : "Select all rows"
            }
          />
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.RowHeaderCell
          key={`checkbox-container-${row.id}`}
          className="align-middle pr-1"
          style={{ width: "28px", minWidth: "28px", maxWidth: "28px" }}
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
            aria-label={`${selectedRows.includes(row.id) ? "Deselect" : "Select"} ${row.name}`}
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
          className="pl-1.5 pr-1 text-center text-body-xs-medium"
          style={{ width: "28px", minWidth: "28px", maxWidth: "28px" }}
        >
          Sl.
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`sl-no-container-${row.id}`}
          className="align-middle pl-1.5 pr-1 text-text-neutral-subdued text-center text-body-xs-medium"
          style={{ width: "28px", minWidth: "28px", maxWidth: "28px" }}
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
          style={{ width: "256px", minWidth: "256px", maxWidth: "256px" }}
        >
          Name
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`name-${row.id}`}
          className="align-middle pl-2 pr-2"
          style={{ width: "256px", minWidth: "256px", maxWidth: "256px" }}
        >
          <div className="flex flex-col justify-center items-start gap-1 h-full">
            <div
              className="flex gap-1.5 items-center w-full overflow-hidden text-ellipsis text-nowrap"
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
          style={{ width: "200px", minWidth: "200px", maxWidth: "200px" }}
        >
          <div className="flex items-center gap-3">
            Location
            <LocationFilterDropdown />
          </div>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`location-${row.id}`}
          className="align-middle"
          style={{ width: "200px", minWidth: "200px", maxWidth: "200px" }}
        >
          <div className="flex flex-col justify-center items-start gap-1 h-full">
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
          style={{ width: "200px", minWidth: "200px", maxWidth: "200px" }}
        >
          <div className="flex items-center gap-3">
            Health <HealthFilterDropdown />
          </div>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`health-${row.id}`}
          className="align-middle"
          style={{ width: "200px", minWidth: "200px", maxWidth: "200px" }}
        >
          <div className="flex flex-col justify-center items-start gap-1 h-full">
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
          style={{ width: "150px", minWidth: "150px", maxWidth: "150px" }}
        >
          <button
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            onClick={() => setSorting("power")}
            aria-label={`Sort by power ${sortObject.sortBy === "power" ? (sortObject.sortOrder === "ASC" ? "ascending, click to sort descending" : "descending, click to sort ascending") : ""}`}
          >
            Power{" "}
            {sortObject && (
              <SortArrows sortObject={sortObject} sortKey="power" />
            )}
          </button>
        </Table.ColumnHeaderCell>
      ),
      body: (row: TableDataRowWithSerialNumber) => (
        <Table.Cell
          key={`power-${row.id}`}
          className="align-middle"
          style={{ width: "150px", minWidth: "150px", maxWidth: "150px" }}
        >
          <div className="flex flex-col justify-center items-start gap-1 h-full">
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
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
        style={{ clip: "rect(0, 0, 0, 0)" }}
      />

      <div className="flex flex-1 gap-4 justify-between xs:flex-col xs:items-start sm:flex-row sm:items-center">
        <div className="max-w-96 w-full">
          <SearchComponent />
        </div>
        <Button
          disabled={dataLoading || selectedRows.length === 0}
          onClick={handleSubmit}
          className="cursor-pointer"
          aria-label={`Submit ${selectedRows.length} selected row${selectedRows.length !== 1 ? "s" : ""}`}
        >
          Submit
        </Button>
      </div>
      <div
        className="w-full border border-border-neutral-default rounded-md overflow-hidden"
        role="region"
        aria-label="Data table with filtering and sorting capabilities"
      >
        {/* Fixed Header with horizontal scroll sync */}
        <div
          ref={headerScrollContainerRef}
          className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <Table.Root
            className="w-full"
            style={{ tableLayout: "fixed", minWidth: "862px" }}
          >
            <Table.Header className="bg-surface-neutral-default">
              <Table.Row className="text-text-neutral-subdued">
                {columns.map((column) => column.header())}
              </Table.Row>
            </Table.Header>
          </Table.Root>
        </div>

        {/* Scrollable Body Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-auto max-h-[calc(100vh-12.75rem)]"
          role="rowgroup"
          aria-busy={dataLoading}
        >
          <Table.Root
            className="w-full"
            style={{ tableLayout: "fixed", minWidth: "862px" }}
          >
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
              {/* Spacer for virtual scroll offset */}
              {rowVirtualizer.getVirtualItems().length > 0 && (
                <tr
                  style={{
                    height: `${rowVirtualizer.getVirtualItems()[0]?.start || 0}px`,
                  }}
                />
              )}
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = data[virtualRow.index];
                return (
                  <Table.Row
                    key={`row-${row.id}`}
                    className={tableRowClassName(row)}
                    aria-selected={selectedRows.includes(row.id)}
                  >
                    {columns.map((column) =>
                      column.body({
                        ...row,
                        serialNumber: virtualRow.index + 1,
                      })
                    )}
                  </Table.Row>
                );
              })}
              {/* Spacer for remaining virtual scroll height */}
              {rowVirtualizer.getVirtualItems().length > 0 && (
                <tr
                  style={{
                    height: `${
                      rowVirtualizer.getTotalSize() -
                      (rowVirtualizer.getVirtualItems()[
                        rowVirtualizer.getVirtualItems().length - 1
                      ]?.end || 0)
                    }px`,
                  }}
                />
              )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
