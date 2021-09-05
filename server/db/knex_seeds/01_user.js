const tableNames = require("../../src/utils/tableNames");

exports.seed = function(knex) {
  return knex(tableNames.users).del()
    .then(function () {
      return knex(tableNames.users).insert([
        {
            id: 1,
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin'
        },
      ]);
    });
};
