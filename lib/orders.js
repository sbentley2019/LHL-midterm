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

const
