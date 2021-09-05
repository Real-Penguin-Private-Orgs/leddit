/* eslint-disable */
const {Knex} = require('knex');
const tableNames = require('../../src/utils/tableNames');

/**
 * @param {Knex} knex 
 */
exports.up = async(knex) => {
    await Promise.all([
        knex.schema.createTable(tableNames.users, (table) => {
                table.increments('id').primary().notNullable();
                table.string('username').unique().notNullable();
                table.string('email', 177).notNullable();
                table.string('password').notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now())
        }),
        knex.schema.createTable(tableNames.posts, (table) => {
                table.increments('id').primary().notNullable();
                table.string('title').unique().notNullable();
                table.string('body', 177).notNullable();
                table.integer('author_id').notNullable().references('id').inTable('users');
                table.timestamp('created_at').defaultTo(knex.fn.now())
        }), 
    ])
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.error(err)
    })
};

/**
 * @param {Knex} knex 
 */
exports.down = async(knex) => {
    await Promise.all([
            tableNames.users,
            tableNames.posts
    ].map((tableName) => knex.schema.dropTableIfExists(tableName)))
};
