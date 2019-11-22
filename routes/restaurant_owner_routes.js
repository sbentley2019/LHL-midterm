const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const menu_items = require('../lib/database/menu_items');
const express = require('express');
const router = express.Router();
const utility = require('../lib/utility');


/* Twilio Imports */
const accountSid = 'AC6aeef0c97f09d55152dc6242c62a5191';
const authToken = '0958ca806061cb75d424c3b6115cd6cf';
const twilio = require('twilio');
const tclient = twilio(accountSid, authToken);

module.exports = function(database) {

  /**
   * Restaurant owner side. This contains two views, dashboard and orders
   * Restaurant id is queried using owner_id from cookie
   */
  router.get('/', (req, res) => {
    const owner_id = req.session.user_id;
    restaurants.findRestaurantIdByOwnerId(owner_id).then(restaurant => restaurant.id).then((restaurant) => {
      database.findAllMenuItemsForRestaurant(restaurant).then(
        rows => {
          res.render('owner_restaurants', { menuItems: rows });
        })
    })

    //Finds all orders corresponding to restaurant 1
    //TODO: Make restaurnts id dynamic to who ever is logged in
    // orders.findByRestaurant(1).then(
    //   rows => {
    //     res.render('owner_restaurants', { orderItems: rows });
    //   });
  });

  router.get('/getOrders', (req, res) => {
    orders.findByRestaurant(1).then(
      rows => {
        res.json({ orderItems: rows });
      });
  });

  /**
   * Confirm order route
   */
  router.post('/confirm_order', (req, res) => {
    const order_id = req.body.order_id;
    const order_time = req.body.order_time;

    orders.findById(order_id)
      .then(order => {
        orders.updateOrder('Accepted', order.id, 'current_status').then(
          rows => {
            tclient.messages
              .create({
                from: 'whatsapp:+14155238886',
                body: `Order #${order.id} has been confirmed, it will be ready in ${req.body.order_time} minutes`,
                to: 'whatsapp:+17059873696'
              })
              .then(message => {
                res.end();
              });
          }
        );
      });
  });

  /**
   * Cancel order route
   */
  router.post('/cancel_order', (req, res) => {
    const order_id = req.body.order_id;
    tclient.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: `Order #${order_id} has been cancelled. We apologize for any inconvenience.`,
        to: 'whatsapp:+17059873696'
      })
      .then(message => {
        orders.updateOrder('Rejected', order_id, 'current_status').then(
          rows => {
            res.end();
          });
      });
  });

  /**
   * Route for completing order
   */
  router.post('/complete_order', (req, res) => {

    const order_id = req.body.order_id;

    restaurants.findRestaurantIdByOrderId(order_id).then(restaurant => {

      const current_lat = 43.644;
      const current_lng = -79.402;
      const destination_lat = restaurant.lat;
      const destination_lng = restaurant.lng;

      tclient.messages
        .create({
          from: 'whatsapp:+14155238886',
          body: `Order #${order_id} has been completed. Please pick up the order at your earliest convienence.

          Here are the directions to the restaurant: https://www.google.com/maps/dir/?api=1&origin=${current_lat},${current_lng}&destination=${destination_lat},${destination_lng}&travelmode=walking`,
          to: 'whatsapp:+17059873696'
        }).then(message => {

          console.log('estimated_end_time', req.body.order_time);

          orders.updateOrder(
              'Ready', order_id, 'current_status',
            )
            .then(row => {
              orders.updateOrder(req.body.order_time, order_id, 'estimated_end_time');
            }).then(() => {
              res.end();
            });
        });
    });

  });

  router.get('/:id/loadMenuItems', (req, res) => {
    menu_items.findByOrderId(req.params.id)
      .then((menu_item) => {
        res.status(200);
        res.json(menu_item);
      }).catch((err) => {
        throw Error('Could not get GET order items');
      });
  });

  /**
   * Updates photo URL of a menu item given and menu item id
   */
  router.post('/uploadPhoto', (req, res) => {
    const updatedImageURL = req.body.updateURL;
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(updatedImageURL, menuItemId, 'image_url')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        });
  })

  router.post('/updateName', (req, res) => {
    const updatedName = req.body.updateName;
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(updatedName, menuItemId, 'name')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        }
      );
  });

  router.post('/updateDescription', (req, res) => {
    const update = req.body.updateDescription;
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(update, menuItemId, 'description')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        }
      );
  });

  router.post('/updatePrice', (req, res) => {
    const update = req.body.updatePrice;
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(update, menuItemId, 'price')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        }
      );
  });

  //TODO: page not updating, database not updating
  router.post('/updateTime', (req, res) => {
    const update = utility.minutesToQueryFormat(Number(req.body.updateTime));
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(update, menuItemId, 'time_to_prepare')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        }
      );
  });

  //TODO: database not updating, need to figure out how to target selection
  router.post('/updateActive', (req, res) => {
    const update = req.body.updateActive;
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(update, menuItemId, 'is_active')
      .then(
        rows => {
          res.redirect('/restaurant/owner');
        }
      );
  });

  router.post('/addMenuItem', (req, res) => {
    const newMenuItemObject = {
      imageUrl: req.body.newImageUrl,
      name: req.body.newName,
      description: req.body.newDescription,
      price: req.body.newPrice,
      timeToPrepare: utility.minutesToQueryFormat(req.body.newTimeToPrepare),
      isActive: req.body.newActive
    };
    console.log(newMenuItemObject);

    //Restaurant ID fetch from session
    const owner_id = req.session.user_id;
    console.log("THIS IS THE OWNER ID", owner_id);
    restaurants.findRestaurantIdByOwnerId(owner_id).then(restaurant => {
      console.log("THIS IS RESTAURANT ID", restaurant);
      database.addMenuItem(newMenuItemObject, restaurant).then(
        rows => {
          res.redirect('/');
        }
      )
    })
  });
  return router;
};
