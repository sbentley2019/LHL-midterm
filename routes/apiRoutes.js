const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const express = require('express');
const router  = express.Router();

module.exports = function(database) {

  /* GET restaurants from database */
  router.get('/load_restaurants', (req, res) => {
    restaurants.findAllRestaurants()
      .then((restaurants) => {
        res.status(200);
        res.json(restaurants);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET resturants');
      });
  });

  /* GET menu_items from database from a restaurant*/
  router.get('restaurant/:id/load_menu_items', (req, res) => {
    restaurants.findAllMenuItemsForRestaurants(1) // using restaurant 1 to test
      .then((menuItems) => {
        res.status(200);
        res.json(menuItems);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET menu_items');
      });
  });

  /* GET orders for a given restaurant */
  router.get('restaurant/:id/loadOrders', (req, res) => {
    orders.findByRestaurant(1) // using restaurant 1 to test
      .then((orders) => {
        res.status(200);
        res.json(orders);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET orders');
      });
  });


  router.post('/restaurant/:id/dish/:id', (req, res) => {
  });


  return router;
};
