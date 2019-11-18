const { Pool }= require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const findAllRestaurants = function() {
  const query = `SELECT * FROM restaurants WHERE is_active LIKE 'TRUE'`;
  return pool.query(query).then(res => res.rows);
};

const findAllMenuItemsForRestaurant = function(restaurant_id) {
  const query = `SELECT * from menu_items WHERE restaurant_id = $1`;
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows);
};


module.exports = {
  findAllRestaurants,
  findAllMenuItemsForRestaurant
};
