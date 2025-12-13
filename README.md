# Table Assignment - Advanced Data Table Application

A modern, high-performance data table application built with Next.js 16, featuring advanced filtering, fuzzy search, virtual scrolling, and comprehensive accessibility support.

## 🎯 Project Overview

This project demonstrates a production-ready data table implementation with enterprise-grade features including:

- **Advanced Search**: Fuzzy search powered by Fuse.js across multiple fields
- **Multi-Column Filtering**: Dynamic multi-select filters for categorical data
- **Sorting**: Client-side sorting with visual indicators
- **Virtual Scrolling**: Efficient rendering of large datasets using TanStack Virtual
- **Row Selection**: Multi-row selection with keyboard support
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Responsive Design**: Mobile-friendly and adaptive layout
- **Type Safety**: Full TypeScript implementation
- **Comprehensive Testing**: Unit and integration tests with Jest and React Testing Library

## ✨ Key Features

### 1. **Intelligent Search**

- Debounced fuzzy search (500ms delay)
- Multi-field search (name, location)
- Real-time results with visual feedback
- Paste handling with newline conversion

### 2. **Advanced Filtering**

- Multi-select filters for Health and Location
- Combined filter logic (AND operation)
- Clear filter indicators
- Persistent filter state

### 3. **Performance Optimizations**

- Virtual scrolling for handling large datasets
- Efficient re-rendering with React memoization
- Optimized bundle size with tree-shaking
- Next.js 16 with Turbopack for faster development

### 4. **Accessibility**

- ARIA labels and live regions
- Screen reader announcements for state changes
- Skip to content link
- Focus management

### 5. **Developer Experience**

- TypeScript for type safety
- ESLint + Prettier for code quality
- Husky + lint-staged for pre-commit hooks
- Comprehensive test coverage
- Clear project structure

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 16.0.10** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS

### UI Components & Libraries

- **Radix UI** - Accessible component primitives
- **TanStack Virtual** - Virtual scrolling for performance
- **Fuse.js** - Fuzzy search library
- **classnames** - Dynamic className composition

### Development Tools

- **Jest 29** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## 📦 Installation

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd table-assignment

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at [http://localhost:3300](http://localhost:3300)

## 🚀 Available Scripts

### Development

```bash
# Start development server (standard)
npm run dev

# Start development server with Turbopack (faster)
npm run dev:turbo

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Type checking
npm run type-check
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Project Structure

```
table-assignment/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and theme variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page
├── assets/                       # Static assets
│   └── images/icons/            # SVG icon components
├── components/                   # React components
│   ├── __tests__/               # Component tests
│   ├── DataTable.tsx            # Main data table component
│   ├── global/                  # Shared components
│   │   ├── LineLoader.tsx       # Loading indicator
│   │   └── SortArrows.tsx       # Sort direction indicator
│   └── root/                    # Layout components
├── data/                         # Static data
│   └── tabledata.ts             # Mock table data
├── enums/                        # TypeScript enums
│   └── TableData.ts             # Table-related enums
├── hooks/                        # Custom React hooks
│   ├── __tests__/               # Hook tests
│   ├── useMultiSelectFilters.tsx # Multi-select filter hook
│   └── useSearch.tsx            # Search functionality hook
├── models/                       # TypeScript interfaces/types
│   ├── Generic.ts               # Generic type definitions
│   └── TableData.ts             # Table data types
├── utils/                        # Utility functions
│   ├── __tests__/               # Utility tests
│   ├── filters.ts               # Filter and sort utilities
│   └── generic.ts               # Generic utility functions
├── jest.config.mjs              # Jest configuration
├── jest.setup.mjs               # Jest setup file
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # This file
└── TESTING.md                   # Comprehensive testing guide
```

## 🎨 Component Architecture

### DataTable Component

The main component orchestrating the entire table functionality:

**Key Responsibilities:**

- Data fetching and state management
- Row selection logic
- Integration of search, filter, and sort
- Virtual scrolling implementation
- Accessibility announcements

**Key Features:**

- Configurable columns with custom renderers
- Sticky header with scrollable body
- Loading states with visual feedback
- Keyboard navigation support

### Custom Hooks

#### `useSearch`

Provides debounced search functionality with accessibility features.

**Features:**

- Configurable debounce delay (default: 500ms)
- Auto-focus support
- Paste handling with newline conversion
- ARIA labels and roles

#### `useMultiSelectFilter`

Manages multi-select filter state and UI.

**Features:**

- Dynamic options
- Clear filter capability
- Accessible dropdown
- Filter state management

## 🧪 Testing

This project includes comprehensive test coverage across components, hooks, and utilities.

### Test Statistics

- **36 passing tests** across 3 test suites
- **Components**: DataTable integration tests
- **Hooks**: useSearch unit tests
- **Utils**: Filter and sort function tests

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for TDD
npm run test:watch

# Coverage report
npm run test:coverage
```

For detailed testing documentation, see [TESTING.md](./TESTING.md)

### Test Coverage Areas

- ✅ Search functionality (debouncing, fuzzy matching)
- ✅ Filter operations (single/multiple filters)
- ✅ Sorting (ascending/descending)
- ✅ Row selection (single/all)
- ✅ User interactions (typing, clicking, pasting)
- ✅ Accessibility features

## ♿ Accessibility Features

This application is built with accessibility as a first-class concern:

### ARIA Support

- Proper ARIA roles (`searchbox`, `table`, `rowgroup`)
- ARIA labels for interactive elements
- Live regions for dynamic announcements
- ARIA-selected states for rows

### Keyboard Navigation

- Tab navigation through interactive elements
- Focus indicators on all focusable elements
- Skip to content link for keyboard users
- Keyboard shortcuts for common actions

### Screen Reader Support

- Announces search results count
- Announces sort changes
- Announces row selection/deselection
- Loading state announcements

### Visual Accessibility

- Sufficient color contrast ratios
- Focus visible indicators
- Clear visual hierarchy
- Responsive font sizes

## ⚡ Performance Optimizations

### Virtual Scrolling

Uses TanStack Virtual to render only visible rows, enabling smooth performance with thousands of records.

**Benefits:**

- Constant rendering performance regardless of dataset size
- Reduced memory footprint
- Smooth scrolling experience

### Code Splitting

Next.js automatically splits code for optimal loading:

- Route-based code splitting
- Dynamic imports for heavy components
- Optimized bundle sizes

### Search & Filter Optimization

- Debounced search to reduce unnecessary computations
- Memoized filter results
- Efficient fuzzy search with Fuse.js

### Asset Optimization

- SVG icons as React components (no image requests)
- Optimized font loading with next/font
- Tailwind CSS purging for minimal CSS bundle

## 🎯 Use Cases

This project demonstrates patterns suitable for:

1. **Admin Dashboards**: User management, data tables
2. **E-commerce**: Product catalogs, order management
3. **Analytics Platforms**: Data exploration and visualization
4. **CRM Systems**: Contact management, lead tracking
5. **Content Management**: Article/media libraries

## 🔧 Configuration

### Port Configuration

The application runs on port 3300 by default. To change it, update `package.json`:

```json
"scripts": {
  "dev": "next dev -p YOUR_PORT"
}
```

### Filter Options

To modify filter options, edit the `DataTable.tsx` component:

```typescript
const { filterObject, FilterDropdown } = useMultiSelectFilter({
  key: "your-field",
  possibleOptions: [
    { label: "Option 1", value: "value1" },
    { label: "Option 2", value: "value2" },
  ],
});
```

### Search Configuration

Customize search behavior in `useSearch` hook:

```typescript
const { search, SearchComponent } = useSearch(
  "Your placeholder", // Placeholder text
  false, // Auto-focus
  500 // Debounce delay (ms)
);
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=your-api-url
```

## 🤝 Development Workflow

### Git Hooks

Pre-commit hooks automatically:

- Run ESLint on staged files
- Format code with Prettier
- Run TypeScript type checking

### Code Style

- **Prettier**: Enforces consistent formatting
- **ESLint**: Catches common errors and anti-patterns
- **TypeScript**: Ensures type safety

### Commit Conventions

Follow conventional commits for clear history:

```
feat: add new feature
fix: bug fix
docs: documentation changes
test: add or update tests
refactor: code refactoring
style: formatting changes
chore: maintenance tasks
```

## 📚 Learning Resources

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Learn Course](https://nextjs.org/learn)

### React & Testing

- [React Documentation](https://react.dev)
- [Testing Library](https://testing-library.com)
- [Jest Documentation](https://jestjs.io)

### Accessibility

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org)

## 🐛 Troubleshooting

### Common Issues

**Issue**: Tests timeout

```bash
# Increase timeout in test
await waitFor(() => { /* ... */ }, { timeout: 5000 })
```

**Issue**: Watchman error

```bash
# Create empty .watchmanconfig
touch .watchmanconfig
```

**Issue**: Port already in use

```bash
# Kill process on port 3300
lsof -ti:3300 | xargs kill -9
```

## 📄 License

This project is private and proprietary.

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

For questions or issues, please contact the development team or open an issue in the repository.

---

**Built with ❤️ using Next.js, React, and TypeScript**
