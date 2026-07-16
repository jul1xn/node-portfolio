import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
  ]),

  {
    rules: {
      // General JavaScript / TypeScript
      "no-console": "warn",
      "no-unused-vars": "error",

      // React
      "react/jsx-key": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next.js
      "@next/next/no-img-element": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Formatting preferences
      "quotes": [
        "error",
        "double",
      ],

      "semi": [
        "error",
        "always",
      ],

      "comma-dangle": [
        "error",
        "always-multiline",
      ],
    },
  },
]);