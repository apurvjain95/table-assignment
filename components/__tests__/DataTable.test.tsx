import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "../DataTable";
import "@testing-library/jest-dom";
import { Theme } from "@radix-ui/themes";

// Mock the data to use a smaller dataset for testing
jest.mock("@/data/tabledata", () => ({
  __esModule: true,
  default: [
    {
      id: "test1",
      name: "Naruto Uzumaki",
      location: "Konoha",
      health: "Healthy",
      power: 9500,
    },
    {
      id: "test2",
      name: "Sasuke Uchiha",
      location: "Konoha",
      health: "Healthy",
      power: 9300,
    },
    {
      id: "test3",
      name: "Sakura Haruno",
      location: "Konoha",
      health: "Injured",
      power: 7500,
    },
    {
      id: "test4",
      name: "Gaara",
      location: "Suna",
      health: "Healthy",
      power: 8800,
    },
    {
      id: "test5",
      name: "Kakashi Hatake",
      location: "Konoha",
      health: "Critical",
      power: 8500,
    },
  ],
}));

// Helper function to render with Theme wrapper
const renderWithTheme = (component: React.ReactElement) => {
  return render(<Theme>{component}</Theme>);
};

describe("DataTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with initial data", async () => {
    renderWithTheme(<DataTable />);

    // Wait for data to load (there's a 1 second delay in getData)
    await waitFor(
      () => {
        expect(screen.queryByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify multiple rows are rendered
    expect(screen.getByText("Sasuke Uchiha")).toBeInTheDocument();
    expect(screen.getByText("Sakura Haruno")).toBeInTheDocument();
    expect(screen.getByText("Gaara")).toBeInTheDocument();
  });

  it("filters table data when user types in the search input", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for initial data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Get the search input
    const searchInput = screen.getByRole("searchbox", {
      name: /search by name or location/i,
    });

    // Type "Naruto" in the search box
    await user.type(searchInput, "Naruto");

    // Wait for debounced search to filter data (500ms delay)
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
        expect(screen.queryByText("Gaara")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify other non-matching items are filtered out
    expect(screen.queryByText("Sasuke Uchiha")).not.toBeInTheDocument();
    expect(screen.queryByText("Sakura Haruno")).not.toBeInTheDocument();
  });

  it("filters table data by location when searching", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for initial data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const searchInput = screen.getByRole("searchbox", {
      name: /search by name or location/i,
    });

    // Search by location "Suna"
    await user.type(searchInput, "Suna");

    // Wait for debounced search
    await waitFor(
      () => {
        expect(screen.getByText("Gaara")).toBeInTheDocument();
        expect(screen.queryByText("Naruto Uzumaki")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify only Suna characters are shown
    expect(screen.queryByText("Sasuke Uchiha")).not.toBeInTheDocument();
    expect(screen.queryByText("Sakura Haruno")).not.toBeInTheDocument();
  });

  it("shows all data when search is cleared", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for initial data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const searchInput = screen.getByRole("searchbox", {
      name: /search by name or location/i,
    }) as HTMLInputElement;

    // Type in search
    await user.type(searchInput, "Naruto");

    // Wait for filter to apply
    await waitFor(
      () => {
        expect(screen.queryByText("Gaara")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Clear the search by selecting all and deleting
    await user.click(searchInput);
    await user.keyboard("{Control>}a{/Control}{Backspace}");

    // Wait for all data to show again
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
        expect(screen.getByText("Gaara")).toBeInTheDocument();
        expect(screen.getByText("Sasuke Uchiha")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("displays correct data in table columns", async () => {
    renderWithTheme(<DataTable />);

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Check if all column headers are present
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getByText("Power")).toBeInTheDocument();

    // Verify data is displayed correctly (checking multiple rows)
    expect(screen.getByText("9500")).toBeInTheDocument(); // Naruto's power
    expect(screen.getByText("9300")).toBeInTheDocument(); // Sasuke's power
    expect(screen.getByText("8800")).toBeInTheDocument(); // Gaara's power
  });

  it("allows row selection and logs selected rows on submit", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    renderWithTheme(<DataTable />);

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Find and click checkbox for Naruto
    const narutoCheckbox = screen.getByLabelText(/select naruto uzumaki/i);
    await user.click(narutoCheckbox);

    // Find and click checkbox for Sasuke
    const sasukeCheckbox = screen.getByLabelText(/select sasuke uchiha/i);
    await user.click(sasukeCheckbox);

    // Click submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    // Verify console.log was called with selected row IDs
    expect(consoleSpy).toHaveBeenCalledWith(
      "selectedRows",
      expect.stringContaining("test1")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "selectedRows",
      expect.stringContaining("test2")
    );

    consoleSpy.mockRestore();
  });

  it("disables submit button when no rows are selected", async () => {
    renderWithTheme(<DataTable />);

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Submit button should be disabled when no rows are selected
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when rows are selected", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();

    // Select a row
    const narutoCheckbox = screen.getByLabelText(/select naruto uzumaki/i);
    await user.click(narutoCheckbox);

    // Submit button should now be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("performs fuzzy search on partial names", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for initial data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const searchInput = screen.getByRole("searchbox", {
      name: /search by name or location/i,
    });

    // Type partial name "Saku" (should match "Sakura")
    await user.type(searchInput, "Saku");

    // Wait for debounced search
    await waitFor(
      () => {
        expect(screen.getByText("Sakura Haruno")).toBeInTheDocument();
        expect(screen.queryByText("Naruto Uzumaki")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("shows no results when search does not match any data", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DataTable />);

    // Wait for initial data to load
    await waitFor(
      () => {
        expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const searchInput = screen.getByRole("searchbox", {
      name: /search by name or location/i,
    });

    // Search for something that doesn't exist
    await user.type(searchInput, "NonExistentCharacter");

    // Wait for search to complete
    await waitFor(
      () => {
        expect(screen.queryByText("Naruto Uzumaki")).not.toBeInTheDocument();
        expect(screen.queryByText("Sasuke Uchiha")).not.toBeInTheDocument();
        expect(screen.queryByText("Gaara")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
