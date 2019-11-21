-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');
INSERT INTO users (first_name, last_name, email, phone, password, time_created, is_active)

VALUES('Jack', 'Owner', 'jack@mail.com', 1234567890, 'ownerJack', CURRENT_TIMESTAMP, true),
('Susan', 'Boyle', 'susan@mail.com', 0987654321, 'boyleSusan', CURRENT_TIMESTAMP, true),
('Jack', 'Ryan', 'jack@cia.com', 1168101214, 'ryanJack', CURRENT_TIMESTAMP, true),
('Javier', 'Whitehead', 'javier@email.com', 1168101543, 'javier', CURRENT_TIMESTAMP, true),
('Milla', 'Sheehan', 'mshee@email.com', 1165831214, 'mshee', CURRENT_TIMESTAMP, true),
('Alena', 'Clay', 'aClay@email.com', 1165831214, 'aClay', CURRENT_TIMESTAMP, true),
('Ansh', 'Goodwin', 'aGood@email.com', 1165831214, 'aGood', CURRENT_TIMESTAMP, true),
('Rami', 'Sawyer', 'rSaw@email.com', 1165831214, 'rSaw', CURRENT_TIMESTAMP, true),
('Alexa', 'Reynolds', 'aReynolds@email.com', 1165831214, 'aRey', CURRENT_TIMESTAMP, true),
('Theon', 'Farrow', 'tFarr@email.com', 1168148364, 'tFarr', CURRENT_TIMESTAMP, true);
