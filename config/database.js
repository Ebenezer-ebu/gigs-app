const Sequelize = require("sequelize");

module.exports = new Sequelize("codegig", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
