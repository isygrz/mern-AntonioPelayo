// Adds getByTest() and a helper to manually fire the offline/online events for diagnostics.

declare global {
  namespace Cypress {
    interface Chainable {
      /** Get elements by data-test attribute. */
      getByTest(testId: string): Chainable<JQuery<HTMLElement>>;
      /** Fire an app-level window event, e.g. 'offline:snapshot-used' or 'offline:snapshot-clear'. */
      fireAppEvent(name: string): Chainable<Window>;
    }
  }
}

Cypress.Commands.add('getByTest', (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add('fireAppEvent', (name: string) => {
  return cy.window().then((win) => {
    win.dispatchEvent(new Event(name));
    return win;
  });
});

export {};
