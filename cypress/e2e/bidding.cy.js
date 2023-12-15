describe("Bidding on Another User's Listing", () => {
    // cy.intercept();
    it("Logs in a registered user, checks that he is logged in, places a bid, and logs out", () => {
      cy.visit("/");
      cy.fixture("login-data.json").then((loginData) => {
        loginData.registeredUsers.forEach((user) => {
          cy.get('[data-cy="expand-btn"]').click();
          cy.get('[data-cy="open-login-form"]').click();
          cy.get('[data-cy="Email"]').type(user.email);
          cy.get('[data-cy="Password"]').type(user.password);
          cy.get('[data-cy="login-btn"]').click();
          cy.get('[data-cy="listing"]:first').click();
          cy.get('[data-cy="current-bid"]').then(($currentBid) => {
            const currentBidAmount = parseFloat($currentBid.text().replace("$", ""));
            
            // Place a bid with a higher amount
            const newBidAmount = currentBidAmount + 10; // Adjust this value as needed
            cy.get('[data-cy="bid-input"]').type(newBidAmount);
            cy.get('[data-cy="place-bid-btn"]').click();
  
            // Check if the bid was successful
            cy.get('[data-cy="current-bid"]').should('contain', `$ ${newBidAmount}`);
          });
  
        });
      });
    });
  });