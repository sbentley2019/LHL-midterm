const { Pool }= require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


/* Finds Orders by ID, should return 1 item */
const findById = function(id) {
  const query = `SELECT * FROM orders WHERE id = $1`;
  const queryParams = [id]
  return pool.query(query, queryParams).then(res => res.rows[0]).catch(err => {
    console.log('Error', err);
  });
};

/* Finds all orders associated to a restaurant_id */
const findByRestaurant = function(restaurant_id) {
  const query = `SELECT * FROM orders WHERE restaurant_id = $1`;

  // TODO: Add function to order by time
  const queryParams = [restaurant_id];
  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};

const findByStatus = function(status) {
  const query = `SELECT * FROM orders WHERE status = '$1'`;
  const queryParams = [status];

  return pool.query(query, queryParams).then(res => res.rows).catch(err => {
    console.log('Error', err);
  });
};

const createOrder = function(order) {
  const {user_id, restaurant_id, total_cost, start_time, estimated_end_time, is_active, status, time_stamp, notes} = order;
  const query = `INSERT INTO (user_id, restaurant_id, total_cost, start_time, estimated_end_time, is_active, status, time_stamp, notes) orders VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const queryParams = [user_id, restaurant_id, total_cost, start_time, estimated_end_time, is_active, status, time_stamp, notes];
  return pool.query(query, queryParams).then(res => res.row[0]).catch(err => {
    console.log('Error', err);
  })
};

const updateOrder = function(order) {
  const {user_id, restaurant_id, total_cost, start_time, estimated_end_time, is_active, status, time_stamp, notes} = order;
  const query

}


