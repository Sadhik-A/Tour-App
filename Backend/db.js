const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "btdvag1sybzpsemaknpv-mysql.services.clever-cloud.com",
    user: "ueaktxxfncvvobyd",
    password: "ueaktxxfncvvobyd",
    database: "btdvag1sybzpsemaknpv",
    charset: "utf8",
  },
});
const bookshelf = require("bookshelf")(knex);
module.exports = bookshelf;