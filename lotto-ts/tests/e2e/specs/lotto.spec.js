// https://docs.cypress.io/api/introduction/api.html

describe('lotto Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    // cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App')
    cy.get('#btn1').click()
    // cy.get('span').contains('0')
  })
})
