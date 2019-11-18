module.exports = function(router, database) {
 //export functions
};

router.get('/login', (req, res) => {
  // should trigger login event
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/restaurants/:id', (req, res) => {
  res.render('restaurant');
});

router.post('/ordercart', (req, res) => {
});

router.post('/restaurant/:id/dish/:id', (req, res) => {
});

router.post('/checkout', (req, res) => {

});


