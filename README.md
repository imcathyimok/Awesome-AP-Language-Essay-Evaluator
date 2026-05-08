# AP Lang Essay Practice Dashboard

Sketch-styled practice platform for AP English Language students.

## Run locally

```bash
npm install
npm run dev
```

If you get a blank page, make sure you opened the dev server URL (not `dist/index.html`):
- `http://localhost:5173/`

## LAN / other-device access (optional)

On Node **v23**, `vite --host` can crash on some macOS setups. If you need to open the site from another device on your Wi‑Fi:

- Install **Node 22 LTS**, then run:

```bash
npm run dev -- --host --port 5173
```

## What’s included

- **Dashboard**: last score, average, practice mix, pencil-line trend chart.
- **Practice**: browse 2023–2025 prompts by type → write/paste/upload → submit for grading.
- **Results**: 6-point rubric breakdown + sticky-note feedback + saved essay.
- **Custom**: evaluate a teacher-made or self-written prompt.

## Notes

- This build uses a **local mock grader** shaped like the official 6-point rubric (Rows A–C). It’s meant for practice feedback, not official scoring.
- Submissions are stored in **localStorage** (per browser).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Awesome-AP-Language-Essay-Evaluator
# Awesome-AP-Language-Essay-Evaluator
