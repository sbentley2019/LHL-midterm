const express = require('express');
const router = express.Router();
const orders = require('../lib/database/orders');
const menu_items = require('../lib/database/menu_items');

/* Twilio Imports */
const accountSid = 'AC6aeef0c97f09d55152dc6242c62a5191';
const authToken = '0958ca806061cb75d424c3b6115cd6cf';
const twilio = require('twilio');
const tclient = twilio(accountSid, authToken);

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

  /* POST to process checkout */
  router.post('/checkout', (req,res) => {
    menu_items.totalOrder(req.session.order_id).then(total_cost => {
      tclient.messages
        .create({
          from: 'whatsapp:+14155238886',
          body: `Order #${req.session.order_id} has been placed, you will be charged $ ${total_cost} when the order is accepted.`,
          to: 'whatsapp:+17059873696'
        }).then(messages_sent => {
          orders.processOrder(req.session.order_id, total_cost);

          req.session.msg = "Order has been placed! Please check your phone for updates";

          res.end();
        });
    });
  });


  /* Clears Session Msg */
  router.post('/clearSession', (req,res) => {
    req.session.msg = "";
    console.log(req.session.msg);
    res.end();
  });


  router.post('/:id', (req, res) => {
    res.status(200);
    menu_items.findById(req.session.order_id, req.body.menu_item).then(order => {

      // Check if menu_item with order_id exist
      if (order) {
        console.log('Adding to existing order');
        orders.addOrderItem(req.session.order_id, req.body.menu_item).then(data => res.json(data));
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

  return router;
};
