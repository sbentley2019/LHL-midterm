const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const findAllRestaurants = function() {
  const query = `SELECT * FROM restaurants WHERE is_active IS TRUE`;
  return pool.query(query).then(res => res.rows);
};

const findAllMenuItemsForRestaurant = function(restaurant_id) {
  const query = `SELECT * from menu_items WHERE restaurant_id = $1`;
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows);
};

const updateMenuItem = function(updatedImageURL, menuItemId) {
  const query = `UPDATE menu_items set image_url = $1 where id = $2;`;
  console.log(updatedImageURL, menuItemId);
  const queryParams = [updatedImageURL, menuItemId];
  return pool.query(query, queryParams);
};


module.exports = {
  findAllRestaurants,
  findAllMenuItemsForRestaurant,
  updateMenuItem
};
