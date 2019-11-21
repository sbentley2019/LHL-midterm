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
   * TODO: Add different owner id functionality
   */
  router.get('/', (req, res) => {
    //TODO: Restaurant ID should be retrieved from session/cookie
    database.findAllMenuItemsForRestaurant(1).then(
      rows => {
        res.render('owner_restaurants', { menuItems: rows });
      });

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

    const order = orders.findById(order_id)
      .then(order => {
        tclient.messages
          .create({
            from: 'whatsapp:+14155238886',
            body: `Order #${order.id} has been confirmed, it will be ready in ${order_time} minutes`,
            to: 'whatsapp:+17059873696'
          })
          .then(message => {
            console.log(message);
            res.redirect('/restaurant/owner');
          });

      },
      err => {
        console.log(err);
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
        console.log(message);
        res.redirect('/restaurant/owner');
      });


  })
  router.get('/:id/loadMenuItems', (req, res) => {
    menu_items.findByOrderId(req.params.id)
      .then((menu_item) => {
        res.status(200);
        res.json(menu_item);
      }).catch((err) => {
        console.log('ERROR: ', err);
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
    }

    //TODO: Make restaurant ID fetch from session, hardcoded at the moment
    database.addMenuItem(newMenuItemObject, 1).
      then(row => {
        res.redirect('/restaurant/owner');
      },
      rej => {
        console.log(rej);
      });
  });

  //-------------Orders view-------------------------

  return router;
};
