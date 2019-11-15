DROP TABLE IF EXISTS orderitem CASCADE;

CREATE TABLE orderitem (
PRIMARY KEY (order_id, menu_item_id),
order_id INTEGER REFERENCES menu_items(id) NOT NULL,
menu_item_id INTEGER REFERENCES orders(id) NOT NULL,
quantity SMALLINT DEFAULT 0
);
