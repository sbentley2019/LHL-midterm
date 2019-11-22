--menu item seeds
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

-- mcdonalds menu
(1, 'Egg McMuffin', 'egg, bacon, cheese and english muffin', 3.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-egg-mcmuffin.jpg?$Product_Desktop$', true),
(1, 'Sausage McMuffin', 'sausage, cheese and english muffin', 3.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-sausage-mcmuffin.jpg?$Product_Desktop$', true),
(1, 'Big Mac', '2 patties, sauce, lettuce, cheese ...', 4.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-big-mac.jpg?$Product_Desktop$', true),
(1, 'Quarter pounder', 'Quarter pound of meat, cheese and bun', 4.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-quarter-pounder-cheese.jpg?$Product_Desktop$', true),
(1, 'Fries', 'Cut from potatoes', 2.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-fries-medium.jpg?$Product_Desktop$', true),
(1, 'Apple slices', 'Cut from apples', 2.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-apple-slices.jpg?$Product_Desktop$', true),
(1, 'Coke', 'Ice cold cola', 2.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-coca-cola.jpg?$Product_Desktop$', true),
(1, 'Coffee iced frappe', 'Arabica beans with ice', 2.99,  '10', 'https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-coffee-iced-frapp-medium.jpg?$Product_Desktop$', true),

-- freshii menu
(2, 'Bacon, Egg and Cheese', 'Classic breakfast in a pocket', 1.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/luTgyaDODzR46wfe1JwKCfOjG8VzbthKytalCUaT.png?d=650x650', true),
(2, 'Cali Smoothie Bowl', 'Wake up in the tropics', 2.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/zVOQ5RpUGxjjjSmb30lvRNBxt3Wg4Qhn61R3MAnU.png?d=650x650', true),
(2, 'Pangoa', 'Fiery bbq with avo? heck yes', 3.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/QPxgDUkvxSuJ112xTW3UhMsOuk757OQuaM5CSuRV.png?d=650x650', true),
(2, 'Oaxaca', 'A mexican- inspired bestseller.', 4.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/w3VybmfgGdfHy3kMHlz4W3bYdHhiwNsx4qeO9WbC.png?d=650x650', true),
(2, 'Freshii Green', 'Greens, avo and pinapple', 5.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/96S1JPS7iESPYGG8lXyofmc4BSqQUrrCwHfR2bOD.png?d=650x650', true),
(2, 'Frozen Yogurt', 'A low-fat frozen treat.', 6.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/80bGLhoduWV6yCts1GsIC9xhfeQbNJG5czzGH8tw.png?d=650x650', true),
(2, 'Cocoa Energii Bites', 'Holiday goodness, without the guilt.', 7.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/5db2fe2d31b40.png?d=650x650', true),
(2, 'Raspberry Kombucha', 'Organic raspberry Kombucha', 8.99,  '15', 'https://d1k7e91iovemsu.cloudfront.net/images/freshii/ecomm/G3Tu4ENmKkKpOl48zDSpF7W2ti58Pqda84Z4ORdw.png?d=650x650', true),



-- burger priest menu
(3, 'Hamburger', 'The OG. Beef patty on bun.', 1.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/Hamburger_2.jpg', true),
(3, 'High Priest', 'Two patties, secret sauce and a bun.', 2.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/HighPriest.png', true),
(3, 'Fresh Cut Fries', 'Fresh hand cut fries.', 3.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/Fries-min.png', true),
(3, 'Chili Cheese Fries', 'Fries, chili and cheddar', 4.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/ChiliCheeseFries-min.png', true),
(3, 'The Vatican On Ice', 'Ice cream between two grilled cheese buns.', 5.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/06/VaticanOnIce.png', true),
(3, 'Cookies', 'Baked in-house chocolate chip cookies.', 6.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/06/Cookies-min.png', true),
(3, 'Old Fashioned Shakes', 'vanilla, chocolate strawberry or mint chip', 7.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/OldFashionedShakes-min.png', true),
(3, 'Kreamsicle Soda', 'Vanilla Ice crease with cream soda', 2.99,  '10', 'https://theburgerspriest.com/wp-content/uploads/2019/05/KreamsicleSoda.png', true),

-- subway menu
(4, 'Egg & Cheese flatbread', 'A classic for a reason', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/RPLC_egg_and_cheese.jpg', true),
(4, 'Ham, Egg & Cheese', 'Hello delicious!', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/Ham_EggWhite_Cheese.jpg', true),
(4, 'Veggie Pizza Sub', 'A little bit of everything.', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/Subway_PizzaSubVeggie_6-Inch_594x334_72_RGB.jpg', true),
(4, 'Turkey, Bacon and Guac', 'Feast on twice the meat.', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/WrapTurkeyBaconGuacSignature_594X334_RGB_72DPI.jpg', true),
(4, 'Buddy Fruits', 'Try a fresh buddy fruits', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/BuddyFruits_594X334.jpg', true),
(4, 'Chips', 'Miss Vickies Honey Dijon', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/Subway_MissVickiesHoneyDijon_594x334_72_RGB.jpg', true),
(4, 'Pepsi', 'Yummy pepsi, lots of sugar', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/Subway_Pepsi_594x334_72_RGB.jpg', true),
(4, 'Pure Leaf Peach', 'Iced tea from real tea leaves', 2.99,  '10', 'https://www.subway.com/ns/images/menu/CAN/ENG/Subway_PureLeafPeach_EN_594x334_72_RGB.jpg', true),

-- test thai restaurant
(5, 'Thai Fried Rice', 'A flavorful Thai fried rice cooked in basil, chicken, and chilli peppers', 10.99,'30', 'https://i0.wp.com/sweetandsavorymeals.com/wp-content/uploads/2015/07/IMG_5092.jpg?w=600&ssl=1',true),
(5, 'Pad Thai', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99, '30','https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true),
(5, 'Pad Thai-9', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99,
'30', 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true),
(5, 'Pad Thai-6', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99, '30', 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true),
(5, 'Pad Thai-2', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99, '30', 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true),
(5, 'Pad Thai-3', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99, '30', 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true),
(5, 'Pad Thai-5', 'A flavorful noodle dish that is cooked in basil, chicken, and bean sprouts', 12.99, '30', 'https://www.gimmesomeoven.com/wp-content/uploads/2019/01/Pad-Thai-Recipe-1.jpg', true);
