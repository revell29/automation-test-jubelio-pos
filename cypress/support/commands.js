import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", () => {
  const API_URL = Cypress.env("apiUrl");
  cy.request({
    method: "POST",
    url: `${API_URL}/login`,
    body: {
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
  }).then((resp) => {
    window.localStorage.setItem("token", resp.body.token);
    window.localStorage.setItem(
      "infoUser",
      JSON.stringify({
        email: resp.body.userName,
        fullName: resp.body.fullName,
      })
    );
  });
});
