-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');
INSERT INTO users (first_name, last_name, email, phone, password, time_created, is_active)
VALUES(
  'Jack',
  'Owner',
  'jack@mail.com',
  1234567890,
  'ownerJack',
  CURRENT_TIMESTAMP,
  true
);

INSERT INTO users (first_name, last_name, email, phone, password, time_created, is_active)
VALUES(
  'Susan',
  'Boyle',
  'susan@mail.com',
  0987654321,
  'boyleSusan',
  CURRENT_TIMESTAMP,
  true
),

('Jack', 'Ryan', 'jack@cia.com', 1168101214, 'ryanJack', CURRENT_TIMESTAMP, true);
