const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "MYSQL STD",
      version: "1.0.0",
      description: "LNY REST API",
    },
    servers: [
      {
        url: "http://localhost:3015" //lny 서버 주소
      },
    ]
  },
  apis: [
    "./controllers/*.js",
    "./swagger/*"
  ]
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};