-- Insert categories and subcategories
INSERT INTO category (name, category_id) VALUES
                                                 ('Clothing', NULL), -- Root category
                                                 ('Men', 1),
                                                 ('Women', 1),
                                                 ('Shirts', 2),
                                                 ('Pants', 2),
                                                 ('Dresses', 3),
                                                 ('Skirts', 3);

-- Insert sizes
INSERT INTO size (name) VALUES
                                ('Small'),
                                ('Medium'),
                                ( 'Large'),
                                ('X-Large');

-- Insert brands
INSERT INTO brand (name) VALUES
                                 ( 'Nike'),
                                 ('Adidas'),
                                 ('Zara'),
                                 ( 'H&M');

-- Insert users (one user and one admin)
INSERT INTO app_user ( username, password, role) VALUES --- password: password123
                                                        ( 'john_doe', '$2a$12$muEb5faSxzEs3kH8BGWzT.ua1RWYn9UozJZTWP9c.diWlrSSOzpdq', 'USER'), -- Regular user                         --- password: adminpass123
                                                        ('admin_user', '$2a$12$oxukuXvpAbRJNMws9BRltO39PtjygvxDz3eVgooK.vUwKnzYweFta', 'ADMIN'); -- Admin user

-- Insert items
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, order_status, buyer_id) VALUES
                                                                                                                              (4, 2, 1, 1, 'Blue Nike Shirt', 'AVAILABLE', 'A stylish blue Nike shirt for men.', 29.99, 0, NULL),
                                                                                                                              (5, 3, 2, 1, 'Black Adidas Pants', 'AVAILABLE', 'Comfortable black Adidas pants for men.', 49.99, 0, NULL),
                                                                                                                              (6, 2, 3, 1, 'Red Zara Dress', 'AVAILABLE', 'Elegant red Zara dress for women.', 59.99, 0, NULL);

-- Insert pictures for items
INSERT INTO picture ( item_id, file_name, file_location) VALUES
                                                                (1, 'blue_shirt.jpg', '/images/blue_shirt.jpg'),
                                                                (2, 'black_pants.jpg', '/images/black_pants.jpg'),
                                                                (3, 'red_dress.jpg', '/images/red_dress.jpg');

-- Insert liked items
INSERT INTO liked_item (buyer_id, item_id) VALUES
                                                   (1, 1), -- John likes the Blue Nike Shirt
                                                   (1, 3); -- John likes the Red Zara Dress
