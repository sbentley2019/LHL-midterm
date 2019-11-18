-- Drop and recreate restaurants table

DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL,
  location VARCHAR(255) NOT NULL,
  start_hour TIME,
  end_hour TIME,
  img_url VARCHAR(255)
)
