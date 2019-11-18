const express = require('express');
const router = express.Router();
const request = require('request');

module.exports = (db) => {

router.get('/:id', (req, res) => {
  console.log(req);
  res.render('restaurant');
});

// router.get('/login', (req, res) => {
//   // should trigger login event
// });

// router.get('/home', (req, res) => {
//   res.render('home');
// });

// router.get('/restaurants/:id', (req, res) => {
//   res.render('restaurant');
// });

// router.post('/ordercart', (req, res) => {
// });

// router.post('/restaurant/:id/dish/:id', (req, res) => {
// });

// router.post('/checkout', (req, res) => {

// });

  return router;
};
