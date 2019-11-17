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
  })
});

router.get('/loadOrders', (req, res) => {
    //function to find orders by order id? or get all orders
    .then((order) => {
      res.status(200);
      res.json(order);
    })
})


router.post('/ordercart'), (req, res) => {
}

router.post('/restaurant/:id/dish/:id'), (req, res) => {
}

router.post('/checkout', (req, res) => {

} = router;


