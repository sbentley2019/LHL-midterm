--Restaurant seeds
INSERT INTO restaurants (
  owner_id,
  name,
  description,
  is_active,
  location,
  start_hour,
  end_hour,
  img_url,
  lat,
  lng)

  VALUES (
    2,
    'Test restaurant 1',
    'This is a Thai test restaurant',
    true,
    '100 Test street, Test city',
    time '10:00',
    time '21:00',
    'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/best_and_worst_thai_dishes_slideshow/1800x1200_slideshow_best_and_worst_thai_dishes_for_your_health.jpg',
    '43.644',
    '-79.402'
  ),

  (3, 'Test Sushi restaurant', 'This is a sushi test restaurant', true, '001 test street, Test City', time '11:00', time '22:00', 'https://p7.hiclipart.com/preview/80/522/323/restaurant-download-clip-art-diner-sign-cliparts.jpg', '43.644', '-79.400'),

  (4, 'Test McDonalds', 'This is a test McDonalds', true, '022 test street, Test City', time '11:00', time '22:00', 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_logo_lovin_it.png', '43.645', '-79.400'),

  (5, 'Test Burger Priest', 'This is a test Burger Priest', true, '056 test street, Test City', time '11:00', time '22:00', 'https://alumni.uoguelph.ca/sites/default/files/burgers-priest.png', '43.643', '-79.399'),

  (6, 'Test Subway', 'This is a test Subway', true, '066 test street, Test City', time '11:00', time '22:00', 'https://image.businessinsider.com/57b231c1db5ce94f008b6df4?width=300&format=jpeg&auto=webp', '43.645', '-79.402');;
