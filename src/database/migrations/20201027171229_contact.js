
exports.up = function(knex) {
  return knex.schema.createTable('CONTACT', function(table){
      table.increments('id').primary();
      table.integer('user_id');
      table.string('name').notNullable();
      table.string('family_name').notNullable();
      table.string('telephone').notNullable();
      table.string('celphone').notNullable();
      table.string('email').notNullable();
      table.string('detail');
      table.string('avatar');
      table.integer('contact_type').notNullable();
      table.integer('status_id')

      table.foreign('contact_type').references('CONTACTTYPE.id')
      table.foreign('user_id').references('USER.id')
      table.foreign('status_id').references('STATUS.id')
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('CONTACT')
};
