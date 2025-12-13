import {
  getFrontendFilteredContent,
  getFrontendSortedContent,
  getFrontendSortedAndFilteredContent,
  fuzzySearchOnFields,
} from "../filters";

describe("Filter Utilities", () => {
  const mockData = [
    {
      id: 1,
      name: "Naruto",
      location: "Konoha",
      power: 9500,
      health: "Healthy",
    },
    {
      id: 2,
      name: "Sasuke",
      location: "Konoha",
      power: 9300,
      health: "Healthy",
    },
    { id: 3, name: "Gaara", location: "Suna", power: 8800, health: "Injured" },
    {
      id: 4,
      name: "Sakura",
      location: "Konoha",
      power: 7500,
      health: "Critical",
    },
    {
      id: 5,
      name: "Kakashi",
      location: "Konoha",
      power: 8500,
      health: "Healthy",
    },
  ];

  describe("getFrontendSortedContent", () => {
    it("sorts data in ascending order", () => {
      const sorted = getFrontendSortedContent(mockData, {
        sortBy: "power",
        sortOrder: "ASC",
      });

      expect(sorted[0].name).toBe("Sakura"); // 7500
      expect(sorted[1].name).toBe("Kakashi"); // 8500
      expect(sorted[2].name).toBe("Gaara"); // 8800
      expect(sorted[3].name).toBe("Sasuke"); // 9300
      expect(sorted[4].name).toBe("Naruto"); // 9500
    });

    it("sorts data in descending order", () => {
      const sorted = getFrontendSortedContent(mockData, {
        sortBy: "power",
        sortOrder: "DESC",
      });

      expect(sorted[0].name).toBe("Naruto"); // 9500
      expect(sorted[1].name).toBe("Sasuke"); // 9300
      expect(sorted[2].name).toBe("Gaara"); // 8800
      expect(sorted[3].name).toBe("Kakashi"); // 8500
      expect(sorted[4].name).toBe("Sakura"); // 7500
    });

    it("does not mutate original array", () => {
      const original = [...mockData];
      getFrontendSortedContent(mockData, {
        sortBy: "power",
        sortOrder: "DESC",
      });

      expect(mockData).toEqual(original);
    });
  });

  describe("getFrontendFilteredContent", () => {
    it("filters data by single filter", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "location",
            values: ["Konoha"],
          },
        ],
      });

      const filtered = getFrontendFilteredContent(mockData, filtersString);

      expect(filtered).toHaveLength(4);
      expect(filtered.every((item) => item.location === "Konoha")).toBe(true);
    });

    it("filters data by multiple filter values", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "location",
            values: ["Konoha", "Suna"],
          },
        ],
      });

      const filtered = getFrontendFilteredContent(mockData, filtersString);

      expect(filtered).toHaveLength(5);
      expect(
        filtered.every((item) => ["Konoha", "Suna"].includes(item.location))
      ).toBe(true);
    });

    it("filters data by multiple filters", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "location",
            values: ["Konoha"],
          },
          {
            key: "health",
            values: ["Healthy"],
          },
        ],
      });

      const filtered = getFrontendFilteredContent(mockData, filtersString);

      expect(filtered).toHaveLength(3);
      expect(
        filtered.every(
          (item) => item.location === "Konoha" && item.health === "Healthy"
        )
      ).toBe(true);
    });

    it("returns all data when no filters applied", () => {
      const filtersString = JSON.stringify({
        filters: [],
      });

      const filtered = getFrontendFilteredContent(mockData, filtersString);

      expect(filtered).toHaveLength(5);
      expect(filtered).toEqual(mockData);
    });

    it("returns all data when filters have empty values", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "location",
            values: [],
          },
        ],
      });

      const filtered = getFrontendFilteredContent(mockData, filtersString);

      expect(filtered).toHaveLength(5);
    });

    it("handles empty filter string", () => {
      const filtered = getFrontendFilteredContent(mockData, "");

      expect(filtered).toHaveLength(5);
    });
  });

  describe("getFrontendSortedAndFilteredContent", () => {
    it("applies both sorting and filtering", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "location",
            values: ["Konoha"],
          },
        ],
      });

      const result = getFrontendSortedAndFilteredContent(
        mockData,
        { sortBy: "power", sortOrder: "DESC" },
        filtersString
      );

      // Should only have Konoha characters
      expect(result).toHaveLength(4);
      expect(result.every((item) => item.location === "Konoha")).toBe(true);

      // Should be sorted by power descending
      expect(result[0].name).toBe("Naruto"); // 9500
      expect(result[1].name).toBe("Sasuke"); // 9300
      expect(result[2].name).toBe("Kakashi"); // 8500
      expect(result[3].name).toBe("Sakura"); // 7500
    });

    it("sorts first then filters", () => {
      const filtersString = JSON.stringify({
        filters: [
          {
            key: "health",
            values: ["Healthy"],
          },
        ],
      });

      const result = getFrontendSortedAndFilteredContent(
        mockData,
        { sortBy: "power", sortOrder: "ASC" },
        filtersString
      );

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe("Kakashi"); // 8500
      expect(result[1].name).toBe("Sasuke"); // 9300
      expect(result[2].name).toBe("Naruto"); // 9500
    });
  });

  describe("fuzzySearchOnFields", () => {
    it("searches by single field", () => {
      const result = fuzzySearchOnFields(mockData, "Naruto", "name");

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Naruto");
    });

    it("searches by multiple fields", () => {
      const result = fuzzySearchOnFields(
        mockData,
        "Konoha",
        "name",
        "location"
      );

      expect(result.length).toBeGreaterThan(0);
      expect(result.every((item) => item.location === "Konoha")).toBe(true);
    });

    it("performs fuzzy matching on partial strings", () => {
      const result = fuzzySearchOnFields(mockData, "Saku", "name");

      // Fuzzy search may match multiple items (e.g., "Saku" matches both "Sakura" and "Sasuke")
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.some((item) => item.name === "Sakura")).toBe(true);
    });

    it("returns all data when search query is empty", () => {
      const result = fuzzySearchOnFields(mockData, "", "name");

      expect(result).toEqual(mockData);
    });

    it("returns empty array when no matches found", () => {
      const result = fuzzySearchOnFields(mockData, "NonExistent", "name");

      expect(result).toHaveLength(0);
    });

    it("handles case-insensitive search", () => {
      const result = fuzzySearchOnFields(mockData, "naruto", "name");

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Naruto");
    });

    it("searches across multiple fields simultaneously", () => {
      const result = fuzzySearchOnFields(mockData, "Suna", "name", "location");

      expect(result.some((item) => item.location === "Suna")).toBe(true);
    });

    it("respects fuzzy threshold for approximate matches", () => {
      // Testing with slight typo
      const result = fuzzySearchOnFields(mockData, "Saske", "name");

      // Should still find Sasuke due to fuzzy matching
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((item) => item.name === "Sasuke")).toBe(true);
    });
  });
});
