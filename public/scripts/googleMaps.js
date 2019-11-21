$(() => {
  let map;
  const restMark = {};
  let currentLat, currentLng;
  // Request current location
  if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        // for when getting location is a success
        currentLat = position.coords.latitude,
        currentLng = position.coords.longitude
      }, function error(error_message) {
        // for when getting location results in an error
        console.error('An error has occured while retrieving location', error_message);
      }
    );
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
  }


  // This function uses the google maps api and the location is centered around lat 43.644, long -79.402

  const initMap = function() {
    let coordinates = {lat: 43.644, lng: -79.402};
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 17,
      gestureHandling: 'cooperative'
    });

    // This puts all the restaurants as markers on the map
    $('.restaurant-cards').each(function() {
      let coordinates = {lat: Number($(this).attr('data-lat')), lng: Number($(this).attr('data-lng')) };
      let restaurant_id = ($(this).attr('href')).split('/')[2];

      restMark[restaurant_id] = new google.maps.Marker({
        position: coordinates,
        map: map,
        size: new google.maps.Size(15, 15),
        animation: google.maps.Animation.DROP,
        icon: `http://thydzik.com/thydzikGoogleMap/markerlink.php?text=${Number(restaurant_id)}&color=5680FC&image=.png`,
        title:$(this).attr("data-name")});
    });
  };

  $('.restaurant-cards').on('mouseenter', function() {
    let restaurant_id = ($(this).attr('href')).split('/')[2];
    restMark[restaurant_id].setAnimation(google.maps.Animation.BOUNCE);
  }).on('mouseleave', function() {
    let restaurant_id = ($(this).attr('href')).split('/')[2];
    restMark[restaurant_id].setAnimation(null);
  });

  //This loads the google map when the home-page is finished loaded
  window.onload = function() {
    initMap();
  };
});
