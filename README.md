# ActionSite

A modern React application built with Vite, Mantine UI, and a fantasy-themed atomic design architecture.

## 🏗️ Architecture

This project uses a **fantasy-themed atomic design methodology** that organizes components into a hierarchical structure inspired by magical elements:

### Traditional Atomic Design vs Our Approach

**Traditional Atomic Design:**

- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Simple combinations of atoms (search form, card)
- **Organisms**: Complex combinations (header, product grid)
- **Templates**: Page layouts without content
- **Pages**: Specific instances with real content

**Our Fantasy-Themed Structure:**

```
src/Codex/
├── ArcaneThreads/     # Design tokens (colors, spacing, typography)
├── Runes/            # Atoms - Basic UI elements (Button, Text, Title)
├── Sigils/           # Molecules - Simple component combinations
├── Enchantments/     # Organisms - Complex feature components
├── Grimoires/        # Templates - Layout components
└── Invocations/      # Pages - Complete page implementations
```

**Why This Approach:**

- **Clear Hierarchy**: Each level builds upon the previous, ensuring consistent component composition
- **Reusability**: Lower-level components can be reused across higher-level components
- **Maintainability**: Changes to base components automatically propagate upward
- **Scalability**: Easy to add new components at the appropriate level
- **Design System**: ArcaneThreads provides consistent design tokens across all components

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd actionsite
npm install
```

## 📜 Available Commands

### Development

```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality

```bash
npm run lint         # Run ESLint to check code quality
npm run lint:fix     # Automatically fix ESLint issues
npm run format       # Format code with Prettier
```

### Testing

```bash
npm test             # Run unit tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI interface
npm run coverage     # Generate test coverage report
```

### Storybook

```bash
npm run storybook    # Start Storybook development server
npm run build-storybook  # Build Storybook for production
```

## 🛠️ Tech Stack

### Core Framework

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing

### UI & Styling

- **Mantine** - React components library with excellent TypeScript support
- **PostCSS** - CSS processing with Mantine-specific plugins
- **CSS Custom Properties** - Theme-aware styling system

### Development Tools

- **TypeScript/JSX** - Type-safe JavaScript with React
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Storybook** - Component development and documentation

## 📚 Development Tools Explained

### Storybook

**Purpose**: Isolated component development and documentation

**Benefits:**

- Develop components in isolation without needing full app context
- Test different component states and props
- Generate living documentation
- Visual regression testing
- Design system showcase

**Usage:**

```bash
npm run storybook
```

Visit `http://localhost:6006` to view your component library

### ESLint

**Purpose**: Code quality and consistency enforcement

**Configuration**: Extends recommended React and JavaScript rules

- Catches potential bugs and anti-patterns
- Enforces consistent code style
- Integrates with your editor for real-time feedback
- Automatic fixing for many issues

### Prettier

**Purpose**: Consistent code formatting

**Benefits:**

- Eliminates debates about code formatting
- Automatically formats on save (with editor integration)
- Consistent style across the entire codebase
- Focus on logic instead of formatting

### Vite

**Purpose**: Modern build tool and development server

**Advantages:**

- Extremely fast hot module replacement (HMR)
- Native ES modules in development
- Optimized production builds
- Built-in TypeScript support
- Plugin ecosystem

## 🎨 Design System

### ArcaneThreads (Design Tokens)

Central configuration for:

- **Colors**: Theme colors, semantic colors, brand colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Font sizes, weights, line heights
- **Breakpoints**: Responsive design breakpoints
- **Shadows**: Elevation system

Example usage:

```javascript
import { spacing, FontSize } from "../ArcaneThreads/Sizes";

const MyComponent = () => (
    <div
        style={{
            padding: spacing.xl,
            fontSize: FontSize.lg
        }}
    >
        Content
    </div>
);
```

## 🧩 Component Examples

### Runes (Atoms)

```jsx
// Basic building blocks
<Button variant="filled">Click me</Button>
<Text size="lg">Some text content</Text>
<Title order={1}>Page Title</Title>
```

### Sigils (Molecules)

```jsx
// Combinations of atoms
<HeroButtons />  // Contains multiple Button components
<HeroText title="Welcome" description="Get started" />
```

### Enchantments (Organisms)

```jsx
// Complex feature components
<HeroSection />  // Contains HeroText + HeroButtons
<NavigationBar />
<ProductGrid />
```

## 🔧 Customization

### Adding New Components

1. **Determine the correct level** based on complexity
2. **Create component directory** in appropriate folder
3. **Follow naming conventions** (PascalCase for components)
4. **Include Storybook stories** for documentation
5. **Export from index files** for clean imports

### Extending the Design System

1. **Add tokens to ArcaneThreads** for new design properties
2. **Update existing components** to use new tokens
3. **Document changes** in Storybook
4. **Test responsive behavior** across breakpoints

## 📱 Responsive Design

The application uses Mantine's responsive utilities and custom CSS for:

- **Desktop**: Traditional navigation with header and sidebar
- **Tablet**: Collapsible navigation with burger menu
- **Mobile**: Bottom tab navigation for better thumb accessibility

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder contains optimized assets ready for deployment to any static hosting service.

## 📄 License

MIT License - see LICENSE file for details
