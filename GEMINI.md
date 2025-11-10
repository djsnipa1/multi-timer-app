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

## Deployment to Cloudflare Workers

To deploy this application to Cloudflare Workers, follow these steps:

1.  **Install Wrangler:**
    ```bash
    pnpm add --save-dev wrangler@^4.0.0
    ```

2.  **Create `wrangler.toml`:**
    Create a `wrangler.toml` file in the project root with the following content:
    ```toml
    name = "multi-timer-app"
    main = "./dist/_worker.js"
    compatibility_date = "2025-11-09"

    [assets]
    directory = "./dist"
    binding = "ASSETS"
    ```

3.  **Create `_worker.js`:**
    Create a `_worker.js` file in the project root with the following content:
    ```javascript
    export default {
      async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/assets/')) {
          return env.ASSETS.fetch(request);
        }
        return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
      },
    };
    ```

4.  **Create `.assetsignore`:**
    Create a `.assetsignore` file in the project root with the following content:
    ```
    _worker.js
    ```

5.  **Update `package.json` scripts:**
    Add the following scripts to your `package.json`:
    ```json
    "copy-worker": "copy _worker.js dist\_worker.js",
    "copy-assets-ignore": "copy .assetsignore dist\.assetsignore",
    "deploy": "pnpm run build && pnpm run copy-worker && pnpm run copy-assets-ignore && wrangler deploy"
    ```

6.  **Deploy:**
    Run the deploy command:
    ```bash
    pnpm run deploy
    ```
    You will need to be logged in to Cloudflare via `wrangler login` or have the `CLOUDFLARE_API_TOKEN` environment variable set.