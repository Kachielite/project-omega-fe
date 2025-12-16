// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  // Disable ESLint rules that might conflict with Prettier formatting
  prettierConfig,
  // Run Prettier as an ESLint rule and report differences as lint errors
  prettierRecommended,
]);
