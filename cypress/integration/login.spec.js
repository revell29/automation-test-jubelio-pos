/// <reference types="cypress" />

const email = Cypress.env("email");
const password = Cypress.env("password");
describe("Login page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
  });

  it("user login should error", () => {
    cy.contains("Invalid email or password").should("not.exist");
    cy.findByRole("textbox").type(email);
    cy.findByLabelText(/password/i).type("8937487354kjkl");
    cy.findByRole("button", { name: /login/i }).click();
    cy.contains("Invalid email or password").should("exist");
  });

  it("user login work fine", () => {
    cy.contains("Invalid email or password").should("not.exist");
    cy.findByRole("textbox").type(email);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole("button", { name: /login/i }).click();

    cy.url().should("include", "/register");
  });
});
