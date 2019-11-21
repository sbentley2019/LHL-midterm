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

  router.get('/:id/orderTotal', (req, res) => {
    menu_items.totalOrder(req.session.order_id)
      .then(total => {
        res.status(200);
        res.json(total);
      }).catch((err) => {
        console.log('ERROR: ', err);
        throw Error('Could not get GET total');
      });
  });

  router.post('/:id', (req, res) => {
    res.status(200);
    menu_items.findById(req.session.order_id, req.body.menu_item).then(order => {

      // Check if menu_item with order_id exist
      if (order) {
        orders.addOrderItem(req.session.order_id, req.body.menu_item).then( data => res.json(data)
        );
      } else {
        orders.createOrderItem(req.session.order_id, req.body.menu_item).then(data => res.json(data));
      }
    });
  });

  /* POST menu_item to current order_id (Unused) */
  router.post('/:id/deleteItem', (req, res) => {
    menu_items.removeOrderItem(req.session.order_id, req.body.menu_item_id);
    res.end();
  });

  /* POST to process checkout */
  router.post('/checkout', (req,res) => {
    console.log('here');
    console.log(req.session.order_id);
    menu_items.totalOrder(req.session.order_id).then(total_cost => {
      console.log("totalcost: ", total_cost);
      orders.processOrder(req.session.order_id, total_cost);
      res.end();
    }).catch(err => console.log('error here'));
  });


  return router;
};
