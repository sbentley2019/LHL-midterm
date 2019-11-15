-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  fisrt_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone INTEGER,
  password VARCHAR(255) NOT NULL,
  time_created TIMESTAMP DEFAULT NOW();
  is_active BOOLEAN NOT NULL
);

