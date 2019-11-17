-- Drop and recreate menu_item table (Example)

DROP TABLE IF EXISTS menu_item CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER DEFAULT 0 NOT NULL ,
  time_to_prepare TIME,
  image_url VARCHAR(255),
  is_active BOOLEAN
);