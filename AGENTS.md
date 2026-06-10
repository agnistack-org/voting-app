# AI Agent Instructions

## Project Overview

Quick Vote is a client-side voting app built with vanilla HTML, CSS, and JavaScript. There are no build tools, bundlers, or package managers — the app runs directly in the browser.

## Architecture

- **index.html** — Page structure and DOM elements
- **style.css** — All styling (dark theme, animations, responsive layout)
- **app.js** — Poll creation, voting logic, and DOM manipulation

All state is held in memory (`votes` array, `hasVoted` flag). There is no backend or persistence.

## Conventions

- No frameworks or libraries — keep it vanilla JS
- No build step — files are served as-is
- Use `const`/`let`, never `var`
- Escape user input before inserting into the DOM (see `escapeHtml`)
- CSS uses the Tailwind color palette naming (slate, indigo) but is hand-written, not Tailwind
- Mobile-first responsive design with `max-width: 480px` container

## Running

```bash
open index.html
# or
python3 -m http.server 8080
```

## Testing

No test framework is set up. To verify manually:

1. Open `index.html` in a browser
2. Create a poll with a question and at least 2 options
3. Click an option to vote — bars and percentages should animate
4. Click "New Poll" to reset

## Common Tasks

### Adding a new feature
- Keep all logic in `app.js` — no separate modules
- Keep all styles in `style.css` — no inline styles
- Sanitize any user-provided text with `escapeHtml` before DOM insertion

### Changing the color scheme
- Colors are defined directly in `style.css` using hex values
- Primary accent: `#6366f1` (indigo-500)
- Background: `#0f172a` (slate-900)
- Surface: `#1e293b` (slate-800)
