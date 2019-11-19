const { Pool }= require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


/* Finds Orders by ID, should return 1 item */
const findById = function(id) {
  const query = `SELECT * FROM orders WHERE id = $1;`;
  const queryParams = [id]
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

/* Finds all active orders for a user_id */
const findByUserId = function(user_id) {
  const query = `SELECT * FROM orders WHERE user_id = $1 ORDER BY time_stamp`;
  const queryParams = [user_id];
  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};


/* Finds all orders associated to a restaurant_id */
const findByRestaurant = function(restaurant_id) {
  const query = `SELECT * FROM orders WHERE restaurant_id = $1;`;
  // TODO: Add function to order by time
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};

const findByStatus = function(status) {
  const query = `SELECT * FROM orders WHERE status = '$1';`;
  const queryParams = [status];

  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};

const createOrder = function(user_id) {
  // const user_id, restaurant_id = user_id, restaurant_id;
  const query = `INSERT INTO orders (user_id)  VALUES ($1) RETURNING *;`;
  const queryParams = [user_id];
  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};

const createOrderItem = function(order_id, menu_item_id) {
  const query = `INSERT INTO orderitem (order_id, menu_item_id) values ($1, $2) RETURNING *;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query,queryParams).then(res => res.rows[0]);
};

const addOrderItem = function(order_id, menu_item_id) {
  const query = `UPDATE orderitem SET quantity = quantity + 1 WHERE order_id = $1 AND menu_item_id = $2 RETURNING *;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query,queryParams).then(res => res.rows[0]);
};


const updateOrder = function(order) {
  const {id, total_cost, estimated_end_time, status, notes} = order;
  const query = `UPDATE orders SET
  total_cost = $2,
  estimated_end_time = $3,
  status = $4,
  notes = $6
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [id, total_cost, estimated_end_time, status, notes];
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

const deleteOrder = function(order) {
  const {id, is_active} = order;
  const query = `UPDATE orders SET
  is_active = $2
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [id, is_active];
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

module.exports = {
  findById,
  findByRestaurant,
  findByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderItem,
  addOrderItem
};

