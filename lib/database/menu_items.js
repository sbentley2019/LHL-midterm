const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/* Finds Menu_items by menu_item_ID and order_id, should return 1 item */
//TODO: Nothing is filled in the orders when new orders are being generated
const findById = function(order_id, menu_item_id) {
  const query = `SELECT * FROM orderitem WHERE order_id = $1 AND menu_item_id = $2;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

/* Find menu_items by order_id - return all menu_items properties */
const findByOrderId = function(order_id) {
  const query = `SELECT orderitem.*, menu_items.* FROM orderitem JOIN menu_items ON menu_items.id = orderitem.menu_item_id WHERE order_id = $1;`;
  const queryParams = [order_id];
  return pool.query(query, queryParams).then(res => res.rows);
};

const totalOrder = function(order_id) {
  const query = `SELECT sum(orderitem.quantity *  menu_items.price) total FROM orderitem JOIN menu_items ON orderitem.menu_item_id = menu_items.id WHERE orderitem.order_id = $1`;
  const queryParams = [order_id];
  return pool.query(query, queryParams).then(res => res.rows[0].total);
};

module.exports = {
  findById,
  findByOrderId,
  totalOrder
};
