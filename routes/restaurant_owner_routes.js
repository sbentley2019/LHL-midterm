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
  return router;
};
