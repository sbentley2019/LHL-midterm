const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const findRestaurantIdByOwnerId = function(owner_id) {
  const query = `
  SELECT restaurants.id
  FROM users
  JOIN restaurants ON users.id = restaurants.owner_id
  WHERE users.id = $1;`
  const queryParams = [owner_id];
  return pool.query(query, queryParams).then(res => res.rows[0]);
}

const findRestaurantIdByOrderId = function(order_id) {
  const query = `
  SELECT restaurants.*
  FROM orders
  JOIN restaurants ON orders.restaurant_id = restaurants.id
  WHERE orders.id = $1;`
  const queryParams = [order_id];
  return pool.query(query, queryParams).then(res => res.rows[0]);
};

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

const findRestaurantOwnerId = function(restaurant_id) {
  const query = `SELECT owner_id FROM restaurants WHERE id = $1`;
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => {
    return res.rows[0].owner_id});
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

/**
 * Adds new menu item to restaurant id
 * @param {} newMenuObject
 * @param {*} restaurantId
 */
const addMenuItem = function(newMenuObject, restaurantId) {
  const query =
    `INSERT INTO menu_items
  (
    restaurant_id,
    image_url,
    name,
    description,
    price,
    time_to_prepare,
    is_active
  )
  VALUES
  (
    ${restaurantId},
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
  );`;
  const queryParams = Object.values(newMenuObject);

  return pool.query(query, queryParams);
}


module.exports = {
  findAllRestaurants,
  findAllMenuItemsForRestaurant,
  findRestaurantById,
  updateMenuItem,
  addMenuItem,
  findRestaurantOwnerId,
  findRestaurantIdByOwnerId,
  findRestaurantIdByOrderId
};
