// Keep this at repo root (next to package.json).
// If you already have one, just ensure baseUrl and specPattern are set appropriately.

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite default; change if needed
    supportFile: 'cypress/support/e2e.ts', // use the TS support file
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // setupNodeEvents(on, config) {}          // optional: plugins
  },
});
