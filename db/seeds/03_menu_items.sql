INSERT INTO menu_items
(
  restaurant_id,
  name,
  description,
  price,
  time_to_prepare,
  image_url,
  is_active
)
VALUES
(
  1,
  'Thai Fried Rice',
  'A flavorful Thai fried rice cooked in basil, chicken, and chilli peppers',
  10.99,
  time '00:30',
  'https://i0.wp.com/sweetandsavorymeals.com/wp-content/uploads/2015/07/IMG_5092.jpg?w=600&ssl=1',
  true
),
(
  1,
  'Pad Thai',
  'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts',
  12.99,
  time '00:30',
  'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg',
  true
),
(2, 'salmon sushi', 'A dish made from freshly cut salmon on top the finest rice', 4.99, time '00:15', 'https://p7.hiclipart.com/preview/96/643/620/california-roll-sashimi-smoked-salmon-sushi-pitstsa-mitstsa-sushi.jpg', true),

(2, 'sushi platter', 'An assorted platter of the chefs favourites', 5.99, time '00:15', 'http://clipart-library.com/images_k/sushi-transparent/sushi-transparent-13.png', true);
