# AI Portfolio

## Project Purpose

This project is a personal AI-powered portfolio demonstrating interactive UI components, a server-side integration with a generative model, and small tooling to showcase projects, contact info, and an AI chat assistant.

Key goals:

- Showcase projects and experience
- Provide an in-page AI assistant (chat) that runs model calls on the server
- Offer an interactive terminal-like UI for fun demos
- Keep secrets (API keys) server-side only

## Technologies Used

- Next.js (App Router)
- React (Client components)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Google Generative AI SDK (server-side only)
- React Markdown (rendering AI output)
- Lucide Icons

## Setup & Run

1. Copy environment variables

   - Create a `.env.local` file at the project root and set your server-side API key:

     GEMINI_API_KEY=<your_api_key_here>

   - Important: never commit `.env.local` or secrets to the repository. If you accidentally committed a key, rotate it immediately.

2. Install dependencies

```bash
npm install
# or
# yarn
# or
# pnpm install
```

3. Run development server

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser.

Notes:

- The frontend only calls the backend endpoint `/api/chat`. The backend performs all calls to the generative model.
- Keep your API key private and rotate it if leaked.

## TODO

- [x] Creating the GitHub Repository and Folder Structure
- [x] Setting up the project structure
- [x] Designing the UI
- [x] Implementing the AI chat assistant
- [x] Implementing the terminal demo
- [x] Implementing the portfolio data
- [x] Make terminal more interactive
- [x] Design Simulated File System Structure
- [x] Verify Terminal Functionality
- [x] Add explicit AI Chat instruction to help command
- [x] Verify links are clickable and AI help is visible
- [x] Implement onKeyDown logic for ArrowUp and ArrowDown
- [] Terminal data needs correction about projects.
- [] Add more features to the AI chat assistant
- [] Add more features to the portfolio data
- [] AI with rag integration
- [] Page transitions


