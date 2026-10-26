// APIs - Opción 3: CRUD de usuario en https://petstore.swagger.io/v2
describe('API Petstore - CRUD de usuario', () => {
  const api = 'https://petstore.swagger.io/v2';
  const username = `joel_qa_${Date.now()}`;
  const user = {
    id: Date.now(),
    username,
    firstName: 'Joel',
    lastName: 'Mendoza',
    email: 'joel.qa@example.com',
    password: 'Passw0rd!',
    phone: '0999999999',
    userStatus: 1,
  };

  // Petstore es un servicio compartido y a veces tarda en reflejar cambios:
  // reintenta el GET hasta 4 veces si responde 404.
  const getUser = (name, attempt = 1) =>
    cy.request({ method: 'GET', url: `${api}/user/${name}`, failOnStatusCode: false }).then((res) => {
      if (res.status === 404 && attempt < 4) {
        cy.wait(1500);
        return getUser(name, attempt + 1);
      }
      return cy.wrap(res);
    });

  it('1. Crear un usuario', () => {
    cy.request('POST', `${api}/user`, user).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.code).to.eq(200);
      expect(res.body.message).to.eq(String(user.id));
    });
  });

  it('2. Buscar el usuario creado', () => {
    getUser(username).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(username);
      expect(res.body.firstName).to.eq(user.firstName);
      expect(res.body.email).to.eq(user.email);
    });
  });

  it('3. Actualizar el nombre y el correo del usuario', () => {
    const updated = { ...user, firstName: 'Joel Actualizado', email: 'joel.actualizado@example.com' };
    cy.request('PUT', `${api}/user/${username}`, updated).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.code).to.eq(200);
    });
  });

  it('4. Buscar el usuario actualizado', () => {
    getUser(username).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.firstName).to.eq('Joel Actualizado');
      expect(res.body.email).to.eq('joel.actualizado@example.com');
    });
  });

  it('5. Eliminar el usuario', () => {
    cy.request('DELETE', `${api}/user/${username}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq(username);
    });
    // Verificación: ya no existe
    cy.request({ method: 'GET', url: `${api}/user/${username}`, failOnStatusCode: false })
      .its('status')
      .should('eq', 404);
  });
});
