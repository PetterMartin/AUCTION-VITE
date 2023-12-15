

describe("Login user journey", () => {
  // cy.intercept();
  it("Logs in a registered user, checks that he is logged in, and then logs out", () => {
    cy.visit("/");
    cy.fixture("login-data.json").then((loginData) => {
      loginData.registeredUsers.forEach((user) => {
        cy.get('[data-cy="expand-btn"]').click();
        cy.get('[data-cy="open-login-form"]').click();
        cy.get('[data-cy="Email"]').type(user.email);
        cy.get('[data-cy="Password"]').type(user.password);
        cy.get('[data-cy="login-btn"]').click();
        cy.get('[data-cy="user-avatar"]').should("exist");
        cy.get('[data-cy="expand-btn"]').click();
        cy.get('[data-cy="logout-btn"]').click();
        cy.get('[data-cy="user-avatar"]').should("not.exist");
      });
    });
  });
});
