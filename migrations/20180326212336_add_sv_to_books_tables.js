
exports.up = function (knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.boolean('sv').defaultTo(false)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.dropColumn('sv')
  })
}
