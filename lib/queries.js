const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

///users

//restaurant side

/**Get a single restaurant from database given there id
 * @param {*} id of restuarant
 */
const getRestaurantWithId = function(id) {
  return pool.query(`SELECT * FROM restaurants WHERE id = $1`, [id])
    .then(
      res => {
        return res.rows[0];
      },
      rej => null
    );
}

/**
 * Get a single menu item from database given there id
 * @param {*} id of menu item
 */
const getMenuItemsWithId = function(id) {
  return pool.query(`SELECT * FROM menu_items WHERE id = $1`, [id])
    .then(
      res => {
        return res.rows[0];
      },
      rej => {
        return null;
      }
    );
}

/**
 * Get all menuItems from database given restuarant ID
 * @param {*} id of restuarant
 */
const getAllMenuItemsWithRestaurantId = function(id) {
  return pool.query(`SELECT * FROM menu_items WHERE restaurant_id = $1`, [id])
    .then(
      res => {
        return res.rows[0];
      },
      rej => {
        return null;
      }
    );
}


//Require this file to use pg.
module.exports = {
  query: (text, params, callback) => {

    //Added logging for all queries made.
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res);
    });
  },
  getMenuItemsWithId,
  getRestaurantWithId,
  getAllMenuItemsWithRestaurantId
}