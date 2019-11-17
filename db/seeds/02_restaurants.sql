--Restaurant seeds
INSERT INTO restaurants (
  owner_id,
  name,
  description,
  is_active,
  location,
  start_hour,
  end_hour)
  VALUES (
    2,
    'Test restaurant 1',
    'This is a Thai test restaurant',
    true,
    '100 Test street, Test city',
    time '10:00',
    time '21:00'
  );
