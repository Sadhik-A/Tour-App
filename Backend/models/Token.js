const bookshelf = require("../db");
const User = require("./user");
const Token = bookshelf.model("Token", {
  tableName: "tokens",
  user: function () {
    return this.belongsTo(User, "id");
  },
});

module.exports = Token;
