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

const findRestaurantById = function(restaurant_id) {
  const query = `SELECT * FROM restaurants WHERE id = $1`;
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows[0]);
};

const findAllMenuItemsForRestaurant = function(restaurant_id) {
  const query = `SELECT * from menu_items WHERE restaurant_id = $1`;
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows);
};

/**
 * Updateds value of menu item
 * @param {*} value to be updated
 * @param {*} menuItemId of menu item
 * @param {*} field of menu item to update
 */
const updateMenuItem = function(value, menuItemId, field) {
  console.log(`UPDATE menu_items set ${field} = ${value} where id = ${menuItemId}`);
  const query = `UPDATE menu_items set ${field} = $1 where id = $2;`;
  const queryParams = [value, menuItemId];
  return pool.query(query, queryParams);
};


module.exports = {
  findAllRestaurants,
  findAllMenuItemsForRestaurant,
  findRestaurantById,
  updateMenuItem
};
