# GEMINI.md

## Project Overview

This is a "Multi Timers" web application. It allows users to create, manage, and run multiple timers simultaneously. The application is built using React, TypeScript, and Vite. It uses Tailwind CSS for styling and includes various UI components from `@radix-ui`. The state is managed using React hooks and `@github/spark/hooks` for key-value storage.

## Building and Running

To get the application running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the application on `http://localhost:5173`.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components:** The UI is built with a combination of custom components and components from `@radix-ui`.
*   **State Management:** The application state is managed using React hooks (`useState`, `useEffect`, `useRef`) and `@github/spark/hooks`'s `useKV` for persistent storage.
*   **Types:** The project uses TypeScript for type safety. Type definitions can be found in `src/lib/types.ts`.
*   **Code Structure:** The main application logic is in `src/App.tsx`. Reusable components are located in `src/components`.
