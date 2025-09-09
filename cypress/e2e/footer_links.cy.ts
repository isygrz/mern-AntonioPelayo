// Fix: use .invoke('attr','rel') then assert includes, avoiding $el.attr() callback.

describe('Footer links', () => {
  const apiFooter = {
    updatedAt: '2025-09-01T12:00:00.000Z',
    links: [
      { name: 'Home', url: '/', order: 0 },
      { name: 'Account', url: '/account', order: 1 },
      { name: 'External Docs', url: 'https://example.com/docs', order: 2 },
      { name: 'Unsafe', url: 'javascript:alert(1)', order: 3 },
    ],
  };

  beforeEach(() => {
    cy.clearLocalStorage('snapshot:footer:v1');
    cy.intercept('GET', '**/api/users/profile', {
      statusCode: 401,
      body: { message: 'Unauthorized' },
    });
    cy.intercept('GET', '**/api/footer*', {
      statusCode: 200,
      body: apiFooter,
    }).as('footer200');
  });

  it('renders internal as SPA links and external in new tab', () => {
    cy.visit('/');
    cy.wait('@footer200');

    cy.get('[data-test="footer-links"]')
      .should('exist')
      .within(() => {
        cy.contains('a, [role="link"]', 'Home')
          .should('have.attr', 'href', '/')
          .and('not.have.attr', 'target');

        cy.contains('a, [role="link"]', 'Account')
          .should('have.attr', 'href', '/account')
          .and('not.have.attr', 'target');

        cy.contains('a', 'External Docs')
          .should('have.attr', 'href', 'https://example.com/docs')
          .and('have.attr', 'target', '_blank')
          .invoke('attr', 'rel')
          .should('include', 'noopener')
          .and('include', 'noreferrer');
      });
  });

  it('drops unsafe javascript: links', () => {
    cy.visit('/');
    cy.wait('@footer200');
    cy.get('[data-test="footer-links"]').within(() => {
      cy.contains('Unsafe').should('not.exist');
    });
  });
});
