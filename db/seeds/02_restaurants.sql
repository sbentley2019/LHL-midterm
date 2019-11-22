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

  VALUES
  (4, 'McDonalds', 'This is a test McDonalds', true, '710 King St W, Toronto', time '11:00', time '22:00', 'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_logo_lovin_it.png', '43.644', '-79.403'),

  (3, 'Freshii', 'Sausages, fries and lots of beer', true, '609 King St W, Toronto', time '11:00', time '22:00', 'https://www.sheratononthefalls.com/wp-content/uploads/2018/05/freshii-niagara-falls.jpg', '43.6442', '-79.403'),

  (5, 'Burger Priest', 'This is a test Burger Priest', true, '579 King St W, Toronto', time '11:00', time '22:00', 'https://alumni.uoguelph.ca/sites/default/files/burgers-priest.png', '43.6443', '-79.3997'),

  (6, 'Subway', 'This is a test Subway', true, '700 King St W, Toronto', time '11:00', time '22:00', 'https://image.businessinsider.com/57b231c1db5ce94f008b6df4?width=300&format=jpeg&auto=webp', '43.6438', '-79.4036'),

  (2, 'Test restaurant 1', 'This is a Thai test restaurant', true, '100 Test street, Test city', time '10:00', time '21:00', 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/best_and_worst_thai_dishes_slideshow/1800x1200_slideshow_best_and_worst_thai_dishes_for_your_health.jpg', '43.644','-79.402');
