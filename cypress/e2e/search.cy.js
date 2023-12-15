
describe("Unregistered user search through listings", () => {
    it("Searches for listings as an unregistered user", () => {
      // Visit the homepage
      cy.visit("/");
  
      // Click on the search bar to focus on it
      cy.get('[data-cy="searchbar"]').click();
  
      // Type the search query in the input field
      const query = "car";
      cy.get('[data-cy="search-input"]').type(query);
      cy.get('[data-cy="search-btn"]').click();
      cy.wait(1000);

  
      // Check each listing for the presence of "car" in the title
      cy.get('[data-cy="listing"]').each(($listing) => {
        // Extract the title and description text from the listing
        const title = $listing.find('[data-cy="listing-title"]').text();
        const description = $listing.find('[data-cy="listing-description"]').text();
  
        // Use Cypress custom command to check if either title or description includes "car"
        cy.wrap(title.toLowerCase().includes(query) || description.toLowerCase().includes(query)).should('be.true');
      });
    });
  });
  