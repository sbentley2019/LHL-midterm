const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const express = require('express');
const router = express.Router();

module.exports = function(database) {

  /**
   * Dashboard Of restaurant owner/
   * TODO: Add different owner id functionality
   */
  router.get('/', (req, res) => {
    database.findAllMenuItemsForRestaurant(1).then(
      rows => {
        res.render('owner_restaurant', { menuItems: rows });
      });
  })
  return router;
};
