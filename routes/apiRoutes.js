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
router.get('/load', (req, res) => {
  //function.findAllRestuarants
  .then((restaurants) => {
    res.status(200);
    res.json(restaurants);
  })
})


router.post('/ordercart'), (req, res) => {
}

router.post('/restaurant/:id/dish/:id'), (req, res) => {
}

router.post('/checkout', (req, res) => {

} = router;


