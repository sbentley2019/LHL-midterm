CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  total_cost INTEGER DEFAULT 0,
  start_time TIMESTAMP,
  estimated_end_time TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  status ENUM ('placed', 'accepted', 'rejected','preparing', 'ready', 'completed'),
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);
