const bookshelf = require("../db");

const Tour = bookshelf.model("Tours", {
  tableName: "Tours",
});

module.exports = Tour;
