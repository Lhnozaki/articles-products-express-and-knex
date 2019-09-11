exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        { name: "Gibson Les Paul", price: 2600, inventory: 10 },
        { name: "Fender Telecaster", price: 1600, inventory: 10 },
        { name: "Gibson SG", price: 2200, inventory: 15 },
        { name: "Fender Jazzmaster", price: 1850, inventory: 20 },
        { name: "Gibson ES-3355", price: 3200, inventory: 3 }
      ]);
    });
};
