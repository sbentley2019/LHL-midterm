const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const express = require('express');
const router = express.Router();

module.exports = function(database) {

  router.get('/', (req, res) => {
    res.render('owner_restaurant');
  })
  return router;
};
