const { Pool }= require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/* Finds Menu_items by menu_item_ID and order_id, should return 1 item */
const findById = function(order_id, menu_item_id) {
  const query = `SELECT * FROM orderitem WHERE order_id = $1 AND menu_item_id = $2;`;
  const queryParams = [order_id, menu_item_id];
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

const findByOrderId = function(order_id) {
  const query = `SELECT * FROM orderitem WHERE order_id = $1;`;
  const queryParams = [order_id];
  return pool.query(query, queryParams).then(res => res.rows)
};

module.exports = {
  findById,
  findByOrderId,
};
