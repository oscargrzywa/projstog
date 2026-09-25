/**
 * ESLint — flat config.
 *
 * W Next 16 `eslint-config-next` eksportuje gotowe konfiguracje flat, więc
 * importujemy je wprost. Poprzednie podejście przez `FlatCompat` z
 * `@eslint/eslintrc` wywalało się z „Converting circular structure to JSON".
 */

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const asArray = (config) => (Array.isArray(config) ? config : [config]);

const config = [
  {
    ignores: [
      /* Archiwum starej strony — nie lintujemy go. */
      "old_projstog/**",
      ".next/**",
      "node_modules/**",
    ],
  },
  ...asArray(nextCoreWebVitals),
  ...asArray(nextTypescript),
  {
    rules: {
      /* Podkreślenie na początku nazwy = celowo odrzucone.
         Używamy tego przy destrukturyzacji, żeby odciąć pola
         (np. `const { body: _body, ...summary } = post`). */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
