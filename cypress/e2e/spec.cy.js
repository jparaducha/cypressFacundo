describe('spec', () => {
  beforeEach(()=> {
    cy.visit(Cypress.env("BASE_URL"));
  });


  it('should compare two phones', () => {

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
    cy.get(".bar-notification-container span.close").should("be.visible").click();
    
    cy.get(".bar-notification-container span.close").should("not.exist")
    cy.get("@compareButtons").eq(1).click({force: true});
    cy.get(".bar-notification-container span.close").should("be.visible").click();

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