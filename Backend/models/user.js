const bookshelf = require('../db');

const User = bookshelf.model('users', {
  tableName: 'users',
});

module.exports = User;