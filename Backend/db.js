const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "br0ccx7r1vjrv0hsbmam-mysql.services.clever-cloud.com",
    user: "uolrb4gyv1mkcsvv",
    password: "uolrb4gyv1mkcsvv",
    database: "br0ccx7r1vjrv0hsbmam",
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
