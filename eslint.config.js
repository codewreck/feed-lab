import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**", ".pnp.*", ".yarn/**"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    rules: {
      "no-undef": "error",
      "no-redeclare": "error",
      "no-const-assign": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
    },
  },
];
