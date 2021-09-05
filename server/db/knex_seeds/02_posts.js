const tableNames = require("../../src/utils/tableNames");

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex(tableNames.posts).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.posts).insert([
          {
              id: 1, 
              title: "First Post",
              body: "First Description",
              author_id: 1
          },
      ]);
    });
};
