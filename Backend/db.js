const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "btdvag1sybzpsemaknpv-mysql.services.clever-cloud.com",
    user: "ueaktxxfncvvobyd",
    password: "TezxJ2EhzyyaUbtlrpZm",
    database: "btdvag1sybzpsemaknpv",
    port: 3306,
  },
});
const bookshelf = require("bookshelf")(knex);
knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
module.exports = bookshelf;