--Restaurant seeds
INSERT INTO restaurants (
  owner_id,
  name,
  description,
  is_active,
  location,
  start_hour,
  end_hour,
  img_url)
  VALUES (
    2,
    'Test restaurant 1',
    'This is a Thai test restaurant',
    true,
    '100 Test street, Test city',
    time '10:00',
    time '21:00',
    'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/best_and_worst_thai_dishes_slideshow/1800x1200_slideshow_best_and_worst_thai_dishes_for_your_health.jpg'
  );
