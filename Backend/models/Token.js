const bookshelf = require("../db");
const User = require("./User");
const Token = bookshelf.model("Token", {
  tableName: "tokens",
  user: function () {
    return this.belongsTo(User, "id");
  },
});

module.exports = Token;
