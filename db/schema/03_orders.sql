DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE ORDERSTATUS;

CREATE TYPE ORDERSTATUS AS ENUM ('Pending', 'Accepted', 'Rejected','Preparing', 'Ready');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  total_cost INTEGER DEFAULT 0,
  start_time TIMESTAMP,
  estimated_end_time TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  current_status ORDERSTATUS DEFAULT 'Pending',
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
