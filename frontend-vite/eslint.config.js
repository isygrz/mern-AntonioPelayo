import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

// ------------------------------------------------------------
// Logger standardization
// Default: LENIENT (flags console.log/info/debug, allows warn/error)
// To enforce STRICT (ban all console.*), see the commented "STRICT" block below.
// ------------------------------------------------------------

export default defineConfig([
  // Keep repo-level ignores
  globalIgnores(['dist']),

  // App rules (JS/JSX)
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // existing
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // --- Logger policy (LENIENT) ---
      // Encourage using src/utils/logger.js instead of raw console.*
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-restricted-properties': [
        'error',
        {
          object: 'console',
          property: 'log',
          message: 'Use logger.debug/info instead of console.log',
        },
        {
          object: 'console',
          property: 'info',
          message: 'Use logger.info instead of console.info',
        },
        {
          object: 'console',
          property: 'debug',
          message: 'Use logger.debug instead of console.debug',
        },
      ],

      // --- STRICT mode (comment IN to ban all console.* and comment OUT the lenient rules above) ---
      // 'no-console': 'off',
      // 'no-restricted-properties': [
      //   'error',
      //   { object: 'console', property: 'log', message: 'Use logger.debug/info instead of console.log' },
      //   { object: 'console', property: 'info', message: 'Use logger.info instead of console.info' },
      //   { object: 'console', property: 'debug', message: 'Use logger.debug instead of console.debug' },
      //   { object: 'console', property: 'warn', message: 'Use logger.warn instead of console.warn' },
      //   { object: 'console', property: 'error', message: 'Use logger.error instead of console.error' },
      // ],
    },
  },

  // Allow the logger utility to use console internally
  {
    files: ['src/utils/logger.js'],
    rules: {
      'no-console': 'off',
      'no-restricted-properties': 'off',
    },
  },

  // Optional: tests often rely on console output
  // {
  //   files: ['**/*.test.{js,jsx}', '**/__tests__/**'],
  //   rules: { 'no-console': 'off' },
  // },
]);
