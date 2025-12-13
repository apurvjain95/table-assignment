# Testing Guide

This document provides comprehensive information about testing the table assignment project.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Test Coverage](#test-coverage)
- [Writing New Tests](#writing-new-tests)

## Installation

Install the required testing dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

Automatically re-runs tests when files change:

```bash
npm run test:watch
```

### Run Tests with Coverage Report

Generates a coverage report showing which lines are tested:

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npm test -- DataTable.test
```

### Run Tests Matching a Pattern

```bash
npm test -- --testNamePattern="search"
```

## Test Structure

### Configuration Files

#### `jest.config.js`

Main Jest configuration file that:

- Integrates with Next.js using `next/jest`
- Sets up module name mapping for `@/` imports
- Configures test environment as `jsdom` for browser simulation
- Defines coverage collection patterns

#### `jest.setup.js`

Global test setup that:

- Imports `@testing-library/jest-dom` for additional matchers
- Mocks browser APIs like `IntersectionObserver`, `ResizeObserver`, and `matchMedia`
- Runs before each test file

### Test Files

#### 1. `components/__tests__/DataTable.test.tsx`

Main integration tests for the DataTable component.

**Test Cases:**

- ✓ Renders the table with initial data
- ✓ Filters table data when user types in the search input
- ✓ Filters table data by location when searching
- ✓ Shows all data when search is cleared
- ✓ Displays correct data in table columns
- ✓ Allows row selection and logs selected rows on submit
- ✓ Disables submit button when no rows are selected
- ✓ Enables submit button when rows are selected
- ✓ Performs fuzzy search on partial names
- ✓ Shows no results when search does not match any data

**Key Features Tested:**

- User typing in search input
- Debounced search (500ms delay)
- Data loading with 1-second delay
- Row selection via checkboxes
- Submit button state management
- Fuzzy search functionality
- Console logging of selected rows

#### 2. `hooks/__tests__/useSearch.test.tsx`

Unit tests for the `useSearch` custom hook.

**Test Cases:**

- ✓ Renders search input with placeholder
- ✓ Updates search value after debounce delay
- ✓ Debounces multiple rapid inputs
- ✓ Clears search value when input is cleared
- ✓ Handles paste events correctly
- ✓ Maintains input focus state
- ✓ Has proper accessibility attributes

**Key Features Tested:**

- Debounced input handling
- Focus management
- Paste event handling with newline conversion
- Accessibility attributes (ARIA labels)

#### 3. `utils/__tests__/filters.test.ts`

Unit tests for filter utility functions.

**Test Cases:**

**getFrontendSortedContent:**

- ✓ Sorts data in ascending order
- ✓ Sorts data in descending order
- ✓ Does not mutate original array

**getFrontendFilteredContent:**

- ✓ Filters data by single filter
- ✓ Filters data by multiple filter values
- ✓ Filters data by multiple filters
- ✓ Returns all data when no filters applied
- ✓ Returns all data when filters have empty values
- ✓ Handles empty filter string

**getFrontendSortedAndFilteredContent:**

- ✓ Applies both sorting and filtering
- ✓ Sorts first then filters

**fuzzySearchOnFields:**

- ✓ Searches by single field
- ✓ Searches by multiple fields
- ✓ Performs fuzzy matching on partial strings
- ✓ Returns all data when search query is empty
- ✓ Returns empty array when no matches found
- ✓ Handles case-insensitive search
- ✓ Searches across multiple fields simultaneously
- ✓ Respects fuzzy threshold for approximate matches

## Test Coverage

### Current Coverage

Run `npm run test:coverage` to see detailed coverage report.

**Covered Areas:**

- ✅ DataTable component (integration tests)
- ✅ useSearch hook (unit tests)
- ✅ Filter utilities (unit tests)
- ✅ Search functionality
- ✅ Sorting functionality
- ✅ Row selection
- ✅ User interactions

**Not Covered Yet:**

- ⚠️ useMultiSelectFilter hook
- ⚠️ Filter dropdowns
- ⚠️ Sort arrows component
- ⚠️ Loader component
- ⚠️ Virtual scrolling behavior

## Writing New Tests

### Best Practices

#### 1. Use User-Centric Queries

Prefer queries that match how users interact with the app:

```typescript
// Good - uses accessible role
const searchInput = screen.getByRole("searchbox");

// Better - includes accessible name
const searchInput = screen.getByRole("searchbox", {
  name: /search by name or location/i,
});

// Avoid - implementation details
const searchInput = screen.getByClassName("search-input");
```

#### 2. Simulate Real User Interactions

Use `@testing-library/user-event` for realistic interactions:

```typescript
const user = userEvent.setup();

// Good - simulates typing
await user.type(input, "search text");

// Good - simulates clicking
await user.click(button);

// Avoid - direct state changes
fireEvent.change(input, { target: { value: "search text" } });
```

#### 3. Wait for Async Operations

Handle debouncing and async data loading:

```typescript
await waitFor(
  () => {
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  },
  { timeout: 2000 }
);
```

#### 4. Test Behavior, Not Implementation

Focus on what the user experiences:

```typescript
// Good - tests user-visible behavior
expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
expect(screen.queryByText("Gaara")).not.toBeInTheDocument();

// Avoid - tests internal state
expect(component.state.filteredData).toHaveLength(1);
```

#### 5. Mock External Dependencies

Keep tests fast and isolated:

```typescript
jest.mock("@/data/tabledata", () => ({
  __esModule: true,
  default: [
    /* mock data */
  ],
}));
```

### Example Test Template

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import YourComponent from '../YourComponent'
import '@testing-library/jest-dom'

describe('YourComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should do something when user interacts', async () => {
    const user = userEvent.setup()

    // Arrange
    render(<YourComponent />)

    // Act
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Expected Result')).toBeInTheDocument()
    })
  })
})
```

## Debugging Tests

### View Test Output

```bash
npm test -- --verbose
```

### Debug Specific Test

```bash
npm test -- --testNamePattern="your test name" --verbose
```

### See What's Rendered

Add this to your test to see the DOM:

```typescript
screen.debug();
```

### Common Issues

#### 1. Test Timeout

If tests timeout, increase the wait timeout:

```typescript
await waitFor(
  () => {
    // assertion
  },
  { timeout: 5000 }
);
```

#### 2. Async Updates Not Applied

Make sure to use `await` and `waitFor`:

```typescript
// Wrong
user.type(input, 'text')
expect(...)

// Correct
await user.type(input, 'text')
await waitFor(() => expect(...))
```

#### 3. Elements Not Found

Use `screen.debug()` to see what's rendered:

```typescript
screen.debug();
// or debug specific element
screen.debug(screen.getByRole("table"));
```

## Continuous Integration

To run tests in CI/CD pipelines, add to your workflow:

```yaml
- name: Run tests
  run: npm test -- --ci --coverage --maxWorkers=2
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event](https://testing-library.com/docs/user-event/intro)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
