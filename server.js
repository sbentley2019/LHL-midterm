// load .env data into process.env
require('dotenv').config();

// Imported Modules
const restaurants = require('./lib/database/restaurants');
const orders = require('./lib/database/orders');

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/database/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));
app.use(methodOverride('_method'));


/* Session Manager */
app.use(cookieSession({
  httpOnly: false,
  name: 'session',
  keys: ['user_id','order_id'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const apiRoutes = require('./routes/apiRoutes');
const orderRoutes = require('./routes/orderRoutes');
const restaurant_owner_routes = require('./routes/restaurant_owner_routes');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));

// Note: mount other resources here, using the same pattern above

/* /api/endpoints/ */


app.use('/restaurant/owner', restaurant_owner_routes(restaurants));

app.get('/', (req, res) => {
  res.status(200);
  console.log('session', req.session);

  restaurants.findAllRestaurants().then(restaurants => {
    let allRestaurants = restaurants;
    res.render('index', {title: 'Ritual', restaurants: allRestaurants});
  }).catch(err => console.log('err', err));

});

app.get("/restaurants/:id", (req, res) => {
  res.status(200);

  restaurants.findAllMenuItemsForRestaurant(req.params.id).then(menu_items => {
    restaurants.findRestaurantById(req.params.id).then(restaurant => {
      let allItems = menu_items;
      res.render('restaurant', {restaurant: restaurant, menu_items: allItems, order_id: req.session.order_id});
    });
  });
});

app.use('/order', orderRoutes(db));
app.use('/api', apiRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
