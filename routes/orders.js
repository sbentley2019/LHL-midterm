const express = require('express');
const router = express.Router();
const orders = require('../lib/database/orders');
const menu_items = require('../lib/database/menu_items');

module.exports = (db) => {

  /* GET order for a given user_id */
  router.get('/:id', (req, res) => {
    orders.findByUserId()
      .then((order) => {
        res.status(200);
        res.json(order);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET order');
      });
  });

  /* GET menu_Items for a given order_id*/
  router.get('/:id/loadMenuItems', (req, res) => {
    menu_items.findByOrderId(req.session.order_id)
      .then((menu_item) => {
        res.status(200);
        res.json(menu_item);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET order items');
      });
  });

  router.post('/:id', (req, res) => {
    res.status(200);
    menu_items.findById(req.session.order_id, req.body.menu_item).then(order => {

      // Check if menu_item with order_id exist
      if (order) {
        orders.addOrderItem(req.session.order_id, req.body.menu_item).then(res => {
          console.log('added');
        });
      } else {
        orders.createOrderItem(req.session.order_id, req.body.menu_item).then((res) => {
          console.log('success');
        }).catch(err => {
          console.log('failed', err);
        });
      }
    });
  });

  /* POST menu_item to current order_id (Unused) */
  router.post('/:id/add', (req, res) => {
    res.status(200);
    orders.updateOrderItem(req.session.order_id, req.params.body.menu_item).then(res => {
      console.log('success');
    });

  });
  return router;
};
