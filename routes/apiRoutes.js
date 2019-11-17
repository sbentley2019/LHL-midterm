const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  res.status(200);
  res.render('index', {title: 'Ritual'});
});

router.get('/restaurants/:id', (req, res) => {
  res.render('restaurant');
});


/* GET restaurants from database */
router.get('/load_restaurants', (req, res) => {
  //function.findAllRestuarants
  .then((restaurants) => {
    res.status(200);
    res.json(restaurants);
  }).catch( (err) => {
    console.log('ERROR: ', err);
    throw Error('Could not get GET resturants');
  })
});

/* GET menu_items from database */
router.get('/load_menu_items', (req, res) => {
  //function find all menu items associated to a restaurant
  .then((menuItems) => {
    res.status(200);
    res.json(menuItems);
  }).catch( (err) => {
    console.log('ERROR: ', err);
    throw Error('Could not get GET menu_items');
  })
});

router.get('/loadOrders', (req, res) => {
    //function to find orders by order id? or get all orders
    .then((order) => {
      res.status(200);
      res.json(order);
    })
    .catch( (err) => {
      console.log('ERROR: ', err);
      throw Error('Could not get GET orders');
    })
});

router.get('/loadMenuItems', (req, res) => {
  //function to find the menu items associated to an order id
  .then((menu_item) => {
    res.status(200);
    res.json(menu_item);
  }).catch( (err) => {
    console.log('ERROR: ', err);
    throw Error('Could not get GET order items');
  });
});

router.post('/order/:id/add', (req, res) => {
  res.status(200);
  const {
    name,
    description,
    price,
    img_url,
    quantity
  };
  //function to insert menu_item to an order_id
  .then((res) => {
    console.log('success')
  }).catch((err) => [
    console.log("failed", err)
  ])
})

router.post('/ordercart'), (req, res) => {
}

router.post('/restaurant/:id/dish/:id'), (req, res) => {
}

router.post('/checkout', (req, res) => {

module.exports = router;


