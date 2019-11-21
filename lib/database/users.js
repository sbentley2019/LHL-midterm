const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const findUserId = function(email) {
  const query = `SELECT id FROM users WHERE email = $1`;
  return pool.query(query, [email]).then(res => res.rows[0]);
};

module.exports = {
  findUserId
};
