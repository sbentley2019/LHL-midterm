$(() => {
  getAllRestaurants.then(function(json) {
    restaurants.addRestaurant(json.restaurants);
  });
});
