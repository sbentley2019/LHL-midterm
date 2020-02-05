const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm"
});

/* Finds Orders by ID, should return 1 item */
const findById = function(id) {
  const query = `SELECT * FROM orders WHERE id = $1;`;
  const queryParams = [id];
  return pool
    .query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => {
      console.log("Error", err);
    });
};

/* Finds all active orders for a user_id */
const findActiveOrderId = function(user_id, restaurant_id) {
  const query = `SELECT * FROM orders WHERE user_id = $1 AND restaurant_id = $2 AND is_active = TRUE`;
  const queryParams = [user_id, restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows[0].id);
};

/* Finds all orders associated to a restaurant_id */
const findByRestaurant = function(restaurant_id) {
  const query = `SELECT * FROM orders WHERE restaurant_id = $1;`;
  // TODO: Add function to order by time
  const queryParams = [restaurant_id];
  console.log(query);
  console.log(queryParams);
  return pool
    .query(query, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.log("Error", err);
    });
};

const findByStatus = function(status) {
  const query = `SELECT * FROM orders WHERE status = '$1';`;
  const queryParams = [status];

  return pool
    .query(query, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.log("Error", err);
    });
};

const createOrder = function(user_id, restaurant_id) {
  // const user_id, restaurant_id = user_id, restaurant_id;
  const query = `INSERT INTO orders (user_id, restaurant_id) VALUES ($1, $2) RETURNING *;`;
  const queryParams = [user_id, restaurant_id];
  return pool
    .query(query, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.log("Error", err);
    });
};

const createOrderItem = function(order_id, menu_item_id) {
  const query = `INSERT INTO orderitem (order_id, menu_item_id) values ($1, $2) RETURNING *;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query, queryParams).then(res => res.rows[0]);
};

const addOrderItem = function(order_id, menu_item_id) {
  const query = `UPDATE orderitem SET quantity = quantity + 1 WHERE order_id = $1 AND menu_item_id = $2 RETURNING *;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query, queryParams).then(res => res.rows[0]);
};

/**
 * Updates value for field of order
 * @param {*} value to be updated
 * @param {*} orderId of menu item
 * @param {*} field of menu item to update
 */
const updateOrder = function(value, orderId, field) {
  console.log(`UPDATE orders set ${field} = ${value} where id = ${orderId}`);
  const query = `UPDATE orders set ${field} = $1 where id = $2;`;
  const queryParams = [value, orderId];
  return pool.query(query, queryParams);
};

const processOrder = function(order_id, total_cost) {
  const query = `UPDATE orders SET
  is_active = FALSE,
  total_cost = $2,
  estimated_end_time = (
    SELECT sum(orderitem.quantity *  menu_items.time_to_prepare) total FROM orderitem JOIN menu_items ON orderitem.menu_item_id = menu_items.id WHERE orderitem.order_id = $1
  )
  WHERE id = $1
  RETURNING *`;
  const queryParams = [order_id, total_cost];
  return pool
    .query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log("ERROR: ", err));
};

module.exports = {
  findById,
  findByRestaurant,
  findByStatus,
  createOrder,
  updateOrder,
  processOrder,
  createOrderItem,
  addOrderItem,
  findActiveOrderId
};
