
exports.up = function(knex) {
  return knex.schema.createTable('USER', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('family_name');
      table.string('email');
      table.string('password');
      table.integer('status_id');
      table.foreign('status_id').references('STATUS.id')
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('USER')
};
