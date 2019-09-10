exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.integer("inventory").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
