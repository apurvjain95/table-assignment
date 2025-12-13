# DataTable Tests

This directory contains Jest tests for the DataTable component.

## Setup

First, install the required dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage report:

```bash
npm run test:coverage
```

## Test Coverage

The `DataTable.test.tsx` file includes the following test scenarios:

### 1. Initial Rendering

- Verifies that the table renders with initial data
- Checks that all data rows are displayed correctly

### 2. Search Functionality

- **Search by Name**: Tests typing in the search input and verifying filtered results
- **Search by Location**: Tests searching by location field (e.g., "Suna", "Konoha")
- **Fuzzy Search**: Tests partial name matching (e.g., "Saku" matches "Sakura")
- **Clear Search**: Tests clearing the search and showing all data again
- **No Results**: Tests search terms that don't match any data

### 3. Data Display

- Verifies all column headers are present (Name, Location, Health, Power)
- Confirms that data values are correctly displayed in the table

### 4. Row Selection

- Tests selecting individual rows via checkboxes
- Verifies that selected row IDs are logged to console on submit
- Tests the submit button disabled/enabled state based on selection

### 5. User Interactions

- Simulates user typing in input fields using `@testing-library/user-event`
- Tests debounced search behavior (500ms delay)
- Tests checkbox interactions

## Test Data

The tests use a mocked smaller dataset (5 entries) instead of the full table data for faster test execution:

```javascript
[
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
];
```

## Key Testing Patterns

### Waiting for Async Data

The component has a 1-second delay in the `getData()` function and a 500ms debounce on search. Tests account for this:

```javascript
await waitFor(
  () => {
    expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
  },
  { timeout: 2000 }
);
```

### Simulating User Input

Tests use `@testing-library/user-event` for realistic user interactions:

```javascript
const user = userEvent.setup();
await user.type(searchInput, "Naruto");
await user.click(checkbox);
```

### Accessibility Testing

Tests use accessible queries to find elements:

```javascript
screen.getByRole("searchbox", { name: /search by name or location/i });
screen.getByLabelText(/select naruto uzumaki/i);
```

## Configuration Files

- `jest.config.js` - Jest configuration with Next.js support
- `jest.setup.js` - Global test setup including mocks for browser APIs
- Package scripts in `package.json` for running tests
