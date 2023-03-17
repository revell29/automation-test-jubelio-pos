const email = Cypress.env("email");
const password = Cypress.env("password");

describe("Jubelio POS TEST", () => {
  beforeEach(() => {
    cy.intercept("https://*.sentry.io/*", {}); // stubbed, never goes to the server
    cy.visit("https://pos.jubelio.com");
  });

  it("login account", () => {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get(".css-xpshvp").click();

    cy.contains("Jubelio POS Test").should("exist");
    cy.get(".css-1d04m3u > :nth-child(6)").click();
    cy.contains("Deactive").should("not.be.visible");
    cy.get(":nth-child(3) > .chakra-linkbox").click();

    cy.get("#initialCash").type("1000");
    cy.contains("Simpan").should("be.visible").click();

    cy.contains("Mendownload Diskon").should("be.visible");
  });
});
