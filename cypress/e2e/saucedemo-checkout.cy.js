// E2E - Opción 2: flujo de compra en https://www.saucedemo.com/
describe('E2E SauceDemo - Flujo de compra', () => {
  const user = { username: 'standard_user', password: 'secret_sauce' };
  const buyer = { firstName: 'Joel', lastName: 'QA', postalCode: '170101' };

  it('Login, agrega 2 productos, ve el carrito, completa el formulario y finaliza la compra', () => {
    // 1. Autenticarse
    cy.visit('/');
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password, { log: false });
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    // 2. Agregar dos productos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');

    // 3. Visualizar el carrito
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack').should('be.visible');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light').should('be.visible');

    // 4. Completar el formulario de compra
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type(buyer.firstName);
    cy.get('[data-test="lastName"]').type(buyer.lastName);
    cy.get('[data-test="postalCode"]').type(buyer.postalCode);
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);

    // 5. Finalizar la compra y validar confirmación
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('[data-test="complete-header"]')
      .invoke('text')
      .should('match', /thank you for your order/i);
  });
});
