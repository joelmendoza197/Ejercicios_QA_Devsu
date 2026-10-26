PRUEBA TÉCNICA QA - E2E + APIs (Cypress)

Contenido
- E2E  (Opción 2): flujo de compra en https://www.saucedemo.com/
  cypress/e2e/saucedemo-checkout.cy.js
- APIs (Opción 3): CRUD de usuario en https://petstore.swagger.io/
  cypress/e2e/api-petstore-user.cy.js

Requisitos
- Node.js 18 o superior y npm
- Conexión a internet

Pasos de ejecución
1. Clonar el repositorio o descomprimir el .zip y abrir una terminal en la carpeta.
2. Instalar dependencias:        npm install
3. Ejecutar todo:                npm test
   Solo E2E:                     npm run test:e2e
   Solo APIs:                    npm run test:api
4. Modo interactivo (opcional):  npm run open

Resultados
- La consola muestra el reporte de cada prueba.
- Capturas de pantalla (solo si hay fallos): cypress/screenshots/

Notas
- Las APIs usan un username único por ejecución (timestamp), así que se puede repetir sin conflictos.
