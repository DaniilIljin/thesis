
INSERT INTO app_user (username, password, role, email, phone, full_name)
VALUES
    --- password: password123
    ('john_doe', '$2a$12$muEb5faSxzEs3kH8BGWzT.ua1RWYn9UozJZTWP9c.diWlrSSOzpdq', 'USER', 'john.doe@example.com', '123-456-7890', 'John Doe'),
    --- password: adminpass123
    ('admin_user', '$2a$12$oxukuXvpAbRJNMws9BRltO39PtjygvxDz3eVgooK.vUwKnzYweFta', 'ADMIN', 'admin.user@example.com', '987-654-3210', 'Admin User');

INSERT INTO size (name)
VALUES ('Small'),
       ('Medium'),
       ('Large'),
       ('X-Large');

INSERT INTO brand (name)
VALUES ('Nike'),
       ('Adidas'),
       ('Zara'),
       ('H&M');

INSERT INTO category (name, parent_category_id) VALUES ('Men', NULL);
INSERT INTO category (name, parent_category_id) VALUES ('Women', NULL);

INSERT INTO category (name, parent_category_id) VALUES ('Shirts', 2);
INSERT INTO category (name, parent_category_id) VALUES ('Pants', 2);

INSERT INTO category (name, parent_category_id) VALUES ('Dresses', 3); -- Shirts parent_category_id = 3
INSERT INTO category (name, parent_category_id) VALUES ('Skirts', 3);  -- Shirts parent_category_id = 3

INSERT INTO category (name, parent_category_id) VALUES ('Outerwear', 1); -- Men parent_category_id = 1
INSERT INTO category (name, parent_category_id) VALUES ('Sweaters', 1);  -- Men parent_category_id = 1

INSERT INTO category (name, parent_category_id) VALUES ('Cardigans', 6); -- Sweaters parent_category_id = 6
INSERT INTO category (name, parent_category_id) VALUES ('Pullovers', 6); -- Sweaters parent_category_id = 6

INSERT INTO category (name, parent_category_id) VALUES ('Jeans', 4);  -- Pants parent_category_id = 4
INSERT INTO category (name, parent_category_id) VALUES ('Trousers', 4);  -- Pants parent_category_id = 4

INSERT INTO category (name, parent_category_id) VALUES ('Blouses', 5);  -- Shirts parent_category_id = 5
INSERT INTO category (name, parent_category_id) VALUES ('Tops', 5);  -- Shirts category_id = 5


INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (4, 2, 1, 1, 'White Casual Shirt', 'AVAILABLE', 'A comfortable white casual shirt for men.', 29.99, NULL),
       (4, 3, 2, 1, 'Black Formal Shirt', 'AVAILABLE', 'A stylish black formal shirt for men.', 39.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (5, 2, 1, 1, 'Grey Jogger Pants', 'AVAILABLE', 'A pair of grey jogger pants for men.', 45.99, NULL),
       (5, 3, 2, 1, 'Blue Denim Jeans', 'AVAILABLE', 'A pair of classic blue denim jeans for men.', 59.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (7, 4, 1, 1, 'Black Leather Jacket', 'AVAILABLE', 'A stylish black leather jacket for men.', 120.99, NULL),
       (7, 2, 2, 1, 'Brown Bomber Jacket', 'AVAILABLE', 'A trendy brown bomber jacket for men.', 85.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (8, 3, 1, 1, 'Grey Wool Cardigan', 'AVAILABLE', 'A warm grey wool cardigan for men.', 55.99, NULL),
       (8, 2, 2, 1, 'Blue Pullover Sweater', 'AVAILABLE', 'A cozy blue pullover sweater for men.', 49.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (3, 2, 1, 1, 'Pink Floral Blouse', 'AVAILABLE', 'A beautiful pink floral blouse for women.', 39.99, NULL),
       (3, 3, 2, 1, 'White Cotton Top', 'AVAILABLE', 'A simple white cotton top for women.', 19.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (4, 2, 1, 1, 'Black Skinny Jeans', 'AVAILABLE', 'Comfortable black skinny jeans for women.', 49.99, NULL),
       (4, 3, 3, 1, 'High-Waisted Blue Trousers', 'AVAILABLE', 'A pair of high-waisted blue trousers for women.', 59.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (6, 4, 1, 1, 'Black Evening Dress', 'AVAILABLE', 'Elegant black evening dress for women.', 89.99, NULL),
       (6, 3, 2, 1, 'Red Satin Dress', 'AVAILABLE', 'A stunning red satin dress for women.', 119.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (7, 2, 3, 1, 'Blue Denim Skirt', 'AVAILABLE', 'A classic blue denim skirt for women.', 39.99, NULL),
       (7, 3, 1, 1, 'Black Mini Skirt', 'AVAILABLE', 'A trendy black mini skirt for women.', 29.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (8, 2, 1, 1, 'White Lace Blouse', 'AVAILABLE', 'An elegant white lace blouse for women.', 49.99, NULL),
       (8, 3, 2, 1, 'Red Satin Blouse', 'AVAILABLE', 'A luxurious red satin blouse for women.', 69.99, NULL);

INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (9, 4, 1, 1, 'Yellow Crop Top', 'AVAILABLE', 'A cute yellow crop top for women.', 24.99, NULL),
       (9, 2, 2, 1, 'Black Tank Top', 'AVAILABLE', 'A simple black tank top for women.', 14.99, NULL);

INSERT INTO picture (item_id, file_name, file_location)
VALUES (1, 'white_shirt.jpg', '/images/men_shirts/white_shirt.jpg'),
       (2, 'black_formal_shirt.jpg', '/images/men_shirts/black_formal_shirt.jpg');

-- Insert pictures for Men > Pants
INSERT INTO picture (item_id, file_name, file_location)
VALUES (3, 'grey_jogger_pants.jpg', '/images/men_pants/grey_jogger_pants.jpg'),
       (4, 'blue_denim_jeans.jpg', '/images/men_pants/blue_denim_jeans.jpg');

-- Insert pictures for Men > Outerwear
INSERT INTO picture (item_id, file_name, file_location)
VALUES (5, 'black_leather_jacket.jpg', '/images/men_outerwear/black_leather_jacket.jpg'),
       (6, 'brown_bomber_jacket.jpg', '/images/men_outerwear/brown_bomber_jacket.jpg');

-- Insert pictures for Men > Sweaters
INSERT INTO picture (item_id, file_name, file_location)
VALUES (7, 'grey_wool_cardigan.jpg', '/images/men_sweaters/grey_wool_cardigan.jpg'),
       (8, 'blue_pullover_sweater.jpg', '/images/men_sweaters/blue_pullover_sweater.jpg');

-- Insert pictures for Women > Shirts
INSERT INTO picture (item_id, file_name, file_location)
VALUES (9, 'pink_floral_blouse.jpg', '/images/women_shirts/pink_floral_blouse.jpg'),
       (10, 'white_cotton_top.jpg', '/images/women_shirts/white_cotton_top.jpg');

-- Insert pictures for Women > Pants
INSERT INTO picture (item_id, file_name, file_location)
VALUES (11, 'black_skinny_jeans.jpg', '/images/women_pants/black_skinny_jeans.jpg'),
       (12, 'blue_trousers.jpg', '/images/women_pants/blue_trousers.jpg');

-- Insert pictures for Women > Dresses
INSERT INTO picture (item_id, file_name, file_location)
VALUES (13, 'black_evening_dress.jpg', '/images/women_dresses/black_evening_dress.jpg'),
       (14, 'red_satin_dress.jpg', '/images/women_dresses/red_satin_dress.jpg');

-- Insert pictures for Women > Skirts
INSERT INTO picture (item_id, file_name, file_location)
VALUES (15, 'blue_denim_skirt.jpg', '/images/women_skirts/blue_denim_skirt.jpg'),
       (16, 'black_mini_skirt.jpg', '/images/women_skirts/black_mini_skirt.jpg');

-- Insert pictures for Women > Blouses
INSERT INTO picture (item_id, file_name, file_location)
VALUES (17, 'white_lace_blouse.jpg', '/images/women_blouses/white_lace_blouse.jpg'),
       (18, 'red_satin_blouse.jpg', '/images/women_blouses/red_satin_blouse.jpg');

-- Insert pictures for Women > Tops
INSERT INTO picture (item_id, file_name, file_location)
VALUES (19, 'yellow_crop_top.jpg', '/images/women_tops/yellow_crop_top.jpg'),
       (20, 'black_tank_top.jpg', '/images/women_tops/black_tank_top.jpg');
