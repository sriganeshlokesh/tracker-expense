/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have personal budget heading in home page", () => {
    cy.get("h2").contains("Personal Budget");
  });

  it("should look the same", () => {
    cy.eyesOpen({
      appName: "Personal Budget",
      testName: "Homepage Check",
    });
    cy.eyesCheckWindow();
    cy.eyesClosed();
  });
});
