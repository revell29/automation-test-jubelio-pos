/// <reference types="cypress" />

describe("Register Page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.login();

    // change with your URL API endpoint
    cy.intercept("GET", "**/userInfo").as("getUserInfo");
    cy.intercept("GET", "**/settings").as("getSettings");
    cy.intercept("GET", "**/locations/33").as("getLocations");
    cy.intercept("POST", "**/closures/open").as("openClosure");

    cy.visit("/register");

    cy.wait(["@getUserInfo"])
      .its("response.statusCode")
      .should("be.oneOf", [200]);

    cy.wait(["@getSettings"])
      .its("response.statusCode")
      .should("be.oneOf", [200]);

    cy.wait(["@getLocations"])
      .its("response.statusCode")
      .should("be.oneOf", [200]);
  });

  it("Should load register page", () => {
    // search location and choose location

    cy.findByRole("textbox").click();
    cy.findByRole("textbox").type("Mataram", { force: true });
    cy.get('button[data-index="1"]').click();
    cy.get("[data-test-register=8]").click();

    cy.findByRole("button", { name: /ya/i }).click();
    cy.url().should("include", "/sales");
    cy.wait("@openClosure").its("response.statusCode").should("equal", 200);

    cy.contains("Sedang mengambil data produk").should("exist");
    cy.contains("100%").should("not.exist");
    cy.contains("DOWNLOAD SELESAI").should("not.exist");
    cy.waitFor(10000);
    cy.contains("100%").should("exist");
    cy.contains("DOWNLOAD SELESAI").should("exist");
  });
});
