import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useSearch from "../useSearch";
import "@testing-library/jest-dom";
import { Theme } from "@radix-ui/themes";

// Test component that uses the useSearch hook
const TestComponent = ({ placeholder = "Search...", delay = 500 }) => {
  const { search, SearchComponent } = useSearch(placeholder, false, delay);

  return (
    <Theme>
      <div>
        <SearchComponent />
        <div data-testid="search-value">{search}</div>
      </div>
    </Theme>
  );
};

describe("useSearch Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input with placeholder", () => {
    render(<TestComponent placeholder="Search by name" />);

    const searchInput = screen.getByPlaceholderText("Search by name");
    expect(searchInput).toBeInTheDocument();
  });

  it("updates search value after debounce delay", async () => {
    const user = userEvent.setup();
    render(<TestComponent delay={300} />);

    const searchInput = screen.getByRole("searchbox");
    const searchValue = screen.getByTestId("search-value");

    // Initially empty
    expect(searchValue).toHaveTextContent("");

    // Type in the input
    await user.type(searchInput, "Naruto");

    // Search value should still be empty immediately
    expect(searchValue).toHaveTextContent("");

    // Wait for debounce (300ms + buffer)
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("Naruto");
      },
      { timeout: 1000 }
    );
  });

  it("debounces multiple rapid inputs", async () => {
    const user = userEvent.setup();
    render(<TestComponent delay={300} />);

    const searchInput = screen.getByRole("searchbox");
    const searchValue = screen.getByTestId("search-value");

    // Type rapidly
    await user.type(searchInput, "N");
    await user.type(searchInput, "a");
    await user.type(searchInput, "r");

    // Should still be empty during debounce
    expect(searchValue).toHaveTextContent("");

    // After debounce, should show full text
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("Nar");
      },
      { timeout: 1000 }
    );
  });

  it("clears search value when input is cleared", async () => {
    const user = userEvent.setup();
    render(<TestComponent delay={300} />);

    const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
    const searchValue = screen.getByTestId("search-value");

    // Type text
    await user.type(searchInput, "Sasuke");

    // Wait for debounced value
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("Sasuke");
      },
      { timeout: 1000 }
    );

    // Clear the input by selecting all and deleting
    await user.click(searchInput);
    await user.keyboard("{Control>}a{/Control}{Backspace}");

    // Wait for debounced empty value
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("");
      },
      { timeout: 1000 }
    );
  });

  it("updates debounced search value when typing", async () => {
    const user = userEvent.setup();
    render(<TestComponent delay={300} />);

    const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
    const searchValue = screen.getByTestId("search-value");

    // Type in the input
    await user.type(searchInput, "TestPaste");

    // Wait for debounced value to update
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("TestPaste");
      },
      { timeout: 1000 }
    );
  });

  it("renders and accepts user input", async () => {
    const user = userEvent.setup();
    render(<TestComponent delay={100} />);

    const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
    const searchValue = screen.getByTestId("search-value");

    // Type in the input
    await user.type(searchInput, "test");

    // Wait for debounced value to update
    await waitFor(
      () => {
        expect(searchValue).toHaveTextContent("test");
      },
      { timeout: 500 }
    );
  });

  it("has proper accessibility attributes", () => {
    const placeholder = "Search by name or location";
    render(<TestComponent placeholder={placeholder} />);

    const searchInput = screen.getByRole("searchbox", {
      name: placeholder,
    });

    expect(searchInput).toHaveAttribute("aria-label", placeholder);
    expect(searchInput).toHaveAttribute("autocomplete", "off");
  });
});
