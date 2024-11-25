-- Insert categories and subcategories
INSERT INTO category (id, name, category_id) VALUES
                                                 (1, 'Clothing', NULL), -- Root category
                                                 (2, 'Men', 1),
                                                 (3, 'Women', 1),
                                                 (4, 'Shirts', 2),
                                                 (5, 'Pants', 2),
                                                 (6, 'Dresses', 3),
                                                 (7, 'Skirts', 3);

-- Insert sizes
INSERT INTO size (id, name) VALUES
                                (1, 'Small'),
                                (2, 'Medium'),
                                (3, 'Large'),
                                (4, 'X-Large');

-- Insert brands
INSERT INTO brand (id, name) VALUES
                                 (1, 'Nike'),
                                 (2, 'Adidas'),
                                 (3, 'Zara'),
                                 (4, 'H&M');

-- Insert users (one user and one admin)
INSERT INTO app_user (id, username, password, role) VALUES
                                                        (1, 'john_doe', 'password123', 'USER'), -- Regular user
                                                        (2, 'admin_user', 'adminpass123', 'ADMIN'); -- Admin user

-- Insert items
INSERT INTO item (id, category_id, size_id, brand_id, seller_id, name, status, description, price, order_status, buyer_id) VALUES
                                                                                                                              (1, 4, 2, 1, 1, 'Blue Nike Shirt', 'AVAILABLE', 'A stylish blue Nike shirt for men.', 29.99, 0, NULL),
                                                                                                                              (2, 5, 3, 2, 1, 'Black Adidas Pants', 'AVAILABLE', 'Comfortable black Adidas pants for men.', 49.99, 0, NULL),
                                                                                                                              (3, 6, 2, 3, 1, 'Red Zara Dress', 'AVAILABLE', 'Elegant red Zara dress for women.', 59.99, 0, NULL);

-- Insert pictures for items
INSERT INTO picture (id, item_id, file_name, file_location) VALUES
                                                                (1, 1, 'blue_shirt.jpg', '/images/blue_shirt.jpg'),
                                                                (2, 2, 'black_pants.jpg', '/images/black_pants.jpg'),
                                                                (3, 3, 'red_dress.jpg', '/images/red_dress.jpg');

-- Insert liked items
INSERT INTO liked_items (id, buyer_id, item_id) VALUES
                                                   (1, 1, 1), -- John likes the Blue Nike Shirt
                                                   (2, 1, 3); -- John likes the Red Zara Dress
