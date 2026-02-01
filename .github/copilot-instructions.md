# AuraPOS AI Coding Instructions

## Project Overview
AuraPOS is a next-generation ERP system with a modern, Notion-inspired UI for point-of-sale operations. Built with React 19, TypeScript, and Tailwind CSS. Stack is intentionally lightweight—no state management library (using React's built-in hooks), no backend framework, mock data only.

## Architecture

### Component Structure
- **Flat component organization** in `src/components/` (no nested folders)
- **Single App.tsx** controls view routing and global UI state (activeView, showCommand, showAuraBrain)
- **No shared state libraries**—each component manages its own state with `useState`
- Components are largely independent with minimal cross-component communication

### Core Components
1. **Sidebar.tsx**: Navigation, menu items (Dashboard, POS, Inventory, Cash Closing)
2. **AlertDashboard.tsx**: Home view with 3 widgets (top products, stock alerts, cash summary)
3. **POSModule.tsx**: Sales interface with product search, cart, quantity management
4. **InventoryModule.tsx**: Product table grouped by provider, stock status badges
5. **CashClosing.tsx**: Collapsible cash breakdown by payment method
6. **CommandPalette.tsx**: Cmd+K navigation search (using `cmdk` library)
7. **AuraBrain.tsx**: AI assistant chatbot with simulated responses

### Data Flow
- No global state manager (rejected Zustand in favor of simplicity)
- Mock data defined directly in components (hardcoded arrays)
- No API calls—all operations are client-side
- View switching via `activeView` state in App.tsx controls which component renders

## Key Patterns & Conventions

### Styling
- **Tailwind CSS classes** for primary styling (e.g., `bg-green-100`, `text-red-800`)
- **Inline styles** used sparingly for dynamic values or edge cases (Sidebar, Aura Brain header)
- **Color palette** follows Notion aesthetic: `#ffffff` background, `#37352f` text, `#e5e5e5` borders
- **Lucide React icons** exclusively for all UI icons

### State Management
- Components use local `useState` hooks exclusively
- Status tracking: `isClosed`, `isExpanded`, `selectedProvider`, `expandedGroups`
- Cart operations in POSModule: immutable updates with spread operator
- No lifting state unless absolutely necessary—keep scope minimal

### Component Interfaces
- Props typed explicitly (e.g., `SidebarProps`, `AuraBrainProps`)
- Most components are pure functional—no class components
- Command/button handlers use arrow functions

### UI/UX Patterns
- **Status badges**: Green (normal), Yellow (warning), Red (critical)—mapped in `getStatusColor` helper
- **Collapsible sections**: Toggle state tracked in parent component (CashClosing, InventoryModule groups)
- **Empty states**: Use badges and disabled states, not loading spinners
- **Success messages**: Temporary display via `showSuccess` state with setTimeout

## Development Workflow

### Build & Dev Commands
```bash
npm run dev        # Start Vite dev server on http://localhost:5173/
npm run build      # TypeScript compilation + Vite bundle
npm run lint       # ESLint check (no auto-fix by default)
npm run preview    # Preview production build locally
```

### Build System
- **Vite** with React plugin for HMR
- **TypeScript** strict mode enabled
- **No build-time environment variables** (.env not used in current setup)

### Code Quality
- **ESLint** configured with Flat Config (v9.39.1)
- Rules: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- **Type safety**: Enforce strict TypeScript (`tsconfig.app.json` inherits strict defaults)
- No formatters configured (Prettier not in deps)

## Common Tasks & Patterns

### Adding a New View
1. Create component in `src/components/NewView.tsx`
2. Import in `App.tsx`
3. Add menu item to Sidebar's `menuItems` array
4. Add conditional render in App.tsx `main` block: `{activeView === 'id' && <NewView />}`

### Updating Mock Data
- Edit the data array directly in the component (e.g., `products` in POSModule)
- No database schema—data structures are simple interfaces defined in component

### Adding UI Interactivity
- Prefer Tailwind classes for styling state changes (`:hover`, `:active`)
- Use inline event handlers: `onClick={() => setExpanded(!expanded)}`
- Animate via CSS or simple timeouts (see AuraBrain simulated response)

### Working with Forms
- Use React Hook Form (in `package.json` but not currently integrated)
- Components don't use it yet—use `useState` for simple inputs

## File Organization Rules
- **One component per file** in `src/components/`
- **No sub-components** in separate files unless shared across 3+ components
- **No utils/helpers folders**—inline utility functions in components or App.tsx
- **Inline interfaces** for component-specific types at top of file

## ESLint & Type Checking
- Run `npm run lint` before commits
- Run `npm run build` to catch TypeScript errors
- React Hooks rules enforced: dependency arrays validated
- No import unused warnings in disabled files (check eslint.config.js)

## Critical Constraints
1. **No external API calls**—AuraBrain responses are hardcoded
2. **No persistence**—cart/data cleared on page reload
3. **Client-side only**—no backend, no database
4. **No dark mode**—white background (#ffffff) enforced throughout
5. **Lightweight bundle**—avoid large dependencies; validate before adding packages

## Testing Notes
- No test framework installed (Jest, Vitest not in deps)
- Manual testing via `npm run dev`
- Validation runs at build time via TypeScript

## Where to Look
- **Component entry point**: [src/App.tsx](src/App.tsx)
- **Design tokens**: See colors in [src/components/Sidebar.tsx](src/components/Sidebar.tsx#L1)
- **Global styles**: [src/index.css](src/index.css)
- **Build config**: [vite.config.ts](vite.config.ts)
- **Type safety**: [tsconfig.app.json](tsconfig.app.json)
