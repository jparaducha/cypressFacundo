describe('spec', () => {
  it('should compare two phones', () => {
    cy.visit('https://demo.nopcommerce.com/');

    cy.get('.notmobile').contains("Electronics").click({force: true});
    cy.get('.sub-category-item').contains("Cell phones").click({force: true});

    cy.get('.buttons').find(".add-to-compare-list-button").as("compareButtons");

    let comparedPhones= [];

    cy.get("h2.product-title a").eq(1).should(($el) => {
      comparedPhones.push($el.get(0).innerText)
    });

    cy.get("h2.product-title a").first().should(($el) => {
      comparedPhones.push($el.get(0).innerText)
    });

    cy.get("@compareButtons").first().click({force: true});
    cy.wait(1000);
    
    cy.get("@compareButtons").eq(1).click({force: true});
    cy.wait(1000);

    cy.get('.customer-service').contains("Compare").click();

    cy.url().should('include', '/compare');

    cy.get(".product-name a").first().then(($el) => {
      cy.wrap($el.get(0).innerText).should("eq",comparedPhones[0]);
    });
    cy.get(".product-name a").eq(1).then(($el) => {
      cy.wrap($el.get(0).innerText).should("eq",comparedPhones[1]);
    });
  })
})