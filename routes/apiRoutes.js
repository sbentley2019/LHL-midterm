const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const express = require('express');
const router = express.Router();

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

  /* GET order for a given user_id */
  router.get('/order/:id', (req, res) => {
    orders.findByUserId()
      .then((order) => {
        res.status(200);
        res.json(order);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET order');
      })
  })

  /* GET menu_Items for a given order_id*/
  router.get('/order/:id/loadMenuItems', (req, res) => {
    orders.findAllMenuItemsForOrder(req.params)
      .then((menu_item) => {
        res.status(200);
        res.json(menu_item);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET order items');
      });
  });

  /* POST menu_item to current order_id */
  router.post('/order/:id/add', (req, res) => {
    res.status(200);
    const {
      name,
      description,
      price,
      img_url,
      quantity
    } = req.params;
    //function to insert menu_item to an order_id
    orders.findAllMenuItemsForOrder(req.params)
      .then((res) => {
        console.log('success');
      }).catch((err) => [
        console.log("failed", err)
      ]);
  });

  router.post('/restaurant/:id/dish/:id', (req, res) => {});

  router.post('/checkout', (req, res) => {});

  return router;
};

// router.post('/checkout', (req, res) => {

// });

return router;
};
