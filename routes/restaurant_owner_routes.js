const restaurants = require('../lib/database/restaurants');
const orders = require('../lib/database/orders');
const express = require('express');
const router = express.Router();
const utility = require('../lib/utility');

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

  /**
   * Updates photo URL of a menu item given and menu item id
   */
  router.post('/uploadPhoto', (req, res) => {
    const updatedImageURL = req.body.updateURL;
    const menuItemId = req.body.menuItemId;
    console.log(typeof(menuItemId));
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
    console.log(update);
    const menuItemId = req.body.menuItemId;
    database.updateMenuItem(update, menuItemId, 'time_to_prepare')
      .then(
        rows => {
          console.log(rows);
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

  return router;
};
