// load .env data into process.env
require('dotenv').config();

// Imported Modules
const restaurants = require('./lib/database/restaurants');
const orders = require('./lib/database/orders');
const users = require('./lib/database/users');
const menu_items = require('./lib/database/menu_items');

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
  keys: ['user_id', 'order_id', 'msg'],
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

//Passes restaurants database as well as orders database.
app.use('/restaurant/owner', (req, res, next) => {
  let user_id = req.session.user_id;
  restaurants.findRestaurantOwnerId(user_id).then(restaurant => {
    if (restaurant) {
      next();
    } else {
      res.redirect('/');
    }
  })
}, restaurant_owner_routes(restaurants, orders));

app.post("/user/login", (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }

  console.log("CHECKING: ", req.session.user_id);

  if (!req.session.user_id) {

    users.findUserId(req.body.email).then(user => {
      if (!user.id) {
        res.json(null);
      } else {
        req.session.user_id = user.id;
        restaurants.findRestaurantOwnerId(user.id).then(restaurant => {
          if (restaurant) {
            res.json(restaurant.id);
          } else {
            res.json(0);
          }
        });
      }
    });

  } else {
    restaurants.findRestaurantOwnerId(req.session.user_id).then(restaurant => {
      if (restaurant) {
        res.json(restaurant.id);
      } else {
        res.json(0);
      }
    });
  }
});


app.post('/user/new', (req, res) => {
  //Insert users.
});

app.post('/user/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.status(200);

  restaurants.findAllRestaurants().then(restaurants => {
    let allRestaurants = restaurants;
    res.render('index', { title: 'Ritual', restaurants: allRestaurants, msg: req.session.msg || '' });
  });

});

app.get("/restaurants/:id", (req, res) => {
  res.status(200);

  // TODO: feed user_id - hardcoded 1 for now
  orders.findActiveOrderId(1, req.params.id).then(order_id => {
    if (order_id) {
      req.session.order_id = order_id;
      restaurants.findAllMenuItemsForRestaurant(req.params.id).then(menu_items => {
        restaurants.findRestaurantById(req.params.id).then(restaurant => {
          let allItems = menu_items;
          res.render('restaurant', { restaurant: restaurant, menu_items: allItems, order_id: req.session.order_id });
        });
      });
    }
  }).catch(no_order_id => {
    //If no order_id exist create one
    // HARD CODED USER ID
    orders.createOrder(1, req.params.id).then(order => {
      // Sets session on GET request before page loads
      req.session.order_id = order[0].id;
      restaurants.findAllMenuItemsForRestaurant(req.params.id).then(menu_items => {
        restaurants.findRestaurantById(req.params.id).then(restaurant => {
          let allItems = menu_items;
          res.render('restaurant', { restaurant: restaurant, menu_items: allItems, order_id: req.session.order_id });
        });
      });
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
