describe('spec', () => {
  it('should compare two phones', () => {
    cy.visit('https://demo.nopcommerce.com/');

    cy.get('.notmobile a[href="/electronics"]').click();
    cy.get(' .sub-category-item .title a[href="/cell-phones"]').first().click();

    cy.get('.buttons button[title="Add to compare list"]').as("compareButtons");

    let comparedPhones= [];

    cy.get("h2.product-title a").eq(1).should(($el) => {
      comparedPhones.push($el.get(0).innerText)
    });

    cy.get("h2.product-title a").first().should(($el) => {
      comparedPhones.push($el.get(0).innerText)
    });

    cy.get("@compareButtons").first().click();
    cy.wait(1000);
    
    cy.get("@compareButtons").eq(1).click();
    cy.wait(1000);

    cy.get('a[href="/compareproducts"]').last().click();

    cy.url().should('include', '/compare');

    cy.get(".product-name a").first().then(($el) => {
      cy.wrap($el.get(0).innerText).should("eq",comparedPhones[0]);
    });
    cy.get(".product-name a").eq(1).then(($el) => {
      cy.wrap($el.get(0).innerText).should("eq",comparedPhones[1]);
    });
  })
})