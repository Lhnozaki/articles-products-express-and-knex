exports.up = function(knex) {
  return knex.schema.createTable("articles", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.text("body").notNullable();
    table.string("url").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
