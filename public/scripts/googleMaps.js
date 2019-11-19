$(() => {
  // This function uses the google maps api and the location is centered around lat 43.644, long -79.402
  function initMap() {
    let coordinates = {lat: 43.644, lng: -79.402};
    let map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 17
    });

    const restMark = {};
    // This puts all the restaurants as markers on the map
    $('.restaurant-cards').each(function() {
      let coordinates = {lat: Number($(this).attr('data-lat')), lng: Number($(this).attr('data-lng')) };
      let restaurant_id = ($(this).attr('href')).split('/')[2];

      restMark[restaurant_id] = new google.maps.Marker({
        position: coordinates,
        map: map,
        animation: google.maps.Animation.DROP,
        label: restaurant_id});
    });
  };

  //This loads the google map when the home-page is finished loaded
  window.onload = function() {
    initMap();
  }
});
