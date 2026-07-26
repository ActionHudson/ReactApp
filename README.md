# ActionSite

A modern React application built with Vite, Mantine UI, and a fantasy-themed atomic design architecture.

## Architecture

This project uses a fantasy-themed atomic design methodology that organizes components into a hierarchical structure inspired by magical elements.

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
├── ArcaneThreads/    # Design tokens (colors, spacing, typography)
├── Runes/            # Atoms - Basic UI elements (Button, Text, Title)
├── Sigils/           # Molecules - Simple component combinations
├── Enchantments/     # Organisms - Complex feature components
├── Grimoires/        # Templates - Layout components
└── Invocations/      # Pages - Complete page implementations
```

### Why This Approach

- **Clear Hierarchy**: Each level builds upon the previous, ensuring consistent component composition.
- **Reusability**: Lower-level components can be reused across higher-level components.
- **Maintainability**: Changes to base components automatically propagate upward.
- **Scalability**: Easy to add new components at the appropriate level.
- **Design System**: ArcaneThreads provides consistent design tokens across all components.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd actionsite
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command starts the Vite development server.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Development with Mock API

This project includes a mock API using `json-server`. The data is stored in `db.json`.

To run the Vite development server and the mock API server concurrently, use:

```bash
npm run dev-db
```

The application will be at `http://localhost:5173` and the mock API at `http://localhost:5000`.

## Available Scripts

### Development

- `npm run dev`: Starts the Vite development server.
- `npm run dev:host`: Starts the Vite development server, exposing it to the network.
- `npm run dev-db`: Runs both the Vite server and the `json-server` mock API.
- `npm run dev-db:host`: Runs both servers and exposes them to the network.

### Building

- `npm run build`: Builds the application for production in the `dist` directory.
- `npm run preview`: Serves the production build locally for preview.

### Testing

- `npm test`: Runs tests with Vitest.
- `npm run test:ui`: Runs tests with the Vitest UI.
- `npm run test:run`: Runs tests once without watch mode.

### Code Quality

- `npm run lint`: Lints the code using ESLint.
- `npm run lint:fix`: Automatically fixes linting issues.

### Storybook

- `npm run storybook`: Starts the Storybook development server.
- `npm run build-storybook`: Builds Storybook as a static web application.

### Deployment

- `npm run deploy`: Deploys the content of the `dist` folder to GitHub Pages.
- `npm run build-deploy`: Builds the project and then deploys it.

## Tech Stack

### Core Frameworks

- **React 18**: A JavaScript library for building user interfaces.
- **Vite**: A modern, fast build tool and development server.
- **React Router**: For client-side routing.

### UI and Styling

- **Mantine**: A comprehensive React components library.
- **PostCSS**: Used for CSS transformations, with `postcss-preset-mantine`.

### Backend

- **json-server**: Used for creating a mock REST API with the `db.json` file.
- **PHP**: A directory of PHP files is included in the `aether/` directory, suggesting a PHP-based backend may be used in some contexts.

### Development and Testing

- **Vitest**: A fast unit-testing framework powered by Vite.
- **React Testing Library**: For testing React components.
- **Storybook**: For isolated component development and documentation.
- **ESLint**: For static code analysis and enforcing code style.

## Deployment

This project is configured for deployment to GitHub Pages.

### Manual Deployment

You can deploy the application by running:

```bash
npm run build-deploy
```

This script first builds the project and then uses `gh-pages` to push the `dist` directory to the `gh-pages` branch of your repository.

### Automated Deployment

The `.github/workflows/deploy.yml` file sets up a GitHub Actions workflow that automatically deploys the application to GitHub Pages whenever code is pushed to the `main` branch.

## License

This project is licensed under the MIT License.
