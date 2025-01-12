-- Users
INSERT INTO app_user (username, password, role, email, phone, full_name)
VALUES
    ('john_doe', '$2a$12$muEb5faSxzEs3kH8BGWzT.ua1RWYn9UozJZTWP9c.diWlrSSOzpdq', 'USER', 'john.doe@example.com', '123-456-7890', 'John Doe'),
    ('admin_user', '$2a$12$oxukuXvpAbRJNMws9BRltO39PtjygvxDz3eVgooK.vUwKnzYweFta', 'ADMIN', 'admin.user@example.com', '987-654-3210', 'Admin User');

-- Sizes
INSERT INTO size (name)
VALUES ('S'),
       ('M'),
       ('L'),
       ('XL');

-- Brands
INSERT INTO brand (name)
VALUES ('Nike'),
       ('Adidas'),
       ('Carhartt'),
       ('Levis');

-- Categories (Main & Subcategories)
-- Clothing
INSERT INTO category (name, parent_category_id) VALUES ('Meeste rõivad', NULL);
INSERT INTO category (name, parent_category_id) VALUES ('Särgid', 1);
INSERT INTO category (name, parent_category_id) VALUES ('Püksid', 1);
INSERT INTO category (name, parent_category_id) VALUES ('Ülerõivad', 1);
INSERT INTO category (name, parent_category_id) VALUES ('Kampsunid ja kapuutsiga joped', 1);

INSERT INTO category (name, parent_category_id) VALUES ('Naiste rõivad', NULL);
INSERT INTO category (name, parent_category_id) VALUES ('Pluusid ja topid', 6);
INSERT INTO category (name, parent_category_id) VALUES ('Kleidid ja seelikud', 6);
INSERT INTO category (name, parent_category_id) VALUES ('Püksid ja teksad', 6);
INSERT INTO category (name, parent_category_id) VALUES ('Ülerõivad', 6);

-- Items
-- Men Shirts
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (2, 2, 3, 2, 'Carhartt graafiline t-särk', 'AVAILABLE', 'Mugav graafiline t-särk Carharttilt.', 29.99, NULL),
       (2, 3, 1, 2, 'Nike spordisärk', 'AVAILABLE', 'Kõrgetasemeline spordisärk Nikelt.', 34.99, NULL);

-- Men Pants
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (3, 2, 3, 1, 'Carhartt tööpüksid', 'AVAILABLE', 'Vastupidavad tööpüksid meestele Carharttilt.', 49.99, NULL),
       (3, 3, 4, 1, 'Levis slim-fit teksad', 'AVAILABLE', 'Stiilsed slim-fit teksad Leviselt.', 59.99, NULL);

-- Men Outerwear
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (4, 3, 3, 1, 'Carhartt soojustatud jope', 'AVAILABLE', 'Soojustatud jope karmidele ilmastikuoludele Carharttilt.', 119.99, NULL),
       (4, 2, 1, 1, 'Nike tuulejope', 'AVAILABLE', 'Kerge tuulejope Nikelt.', 89.99, NULL);

-- Men Sweaters
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (5, 2, 3, 1, 'Carhartt kampsun', 'AVAILABLE', 'Mugav kampsun Carharttilt.', 65.99, NULL),
       (5, 3, 2, 1, 'Adidas kapuutsiga kampsun', 'AVAILABLE', 'Mugav kapuutsiga kampsun külma ilma jaoks.', 54.99, NULL);

-- Women Blouses & Tops
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (7, 2, 3, 1, 'Carhartt chambray pluus', 'AVAILABLE', 'Stiilne chambray pluus Carharttilt.', 49.99, NULL),
       (7, 3, 1, 1, 'Nike spordipluus', 'AVAILABLE', 'Kõrgetasemeline pluus Nikelt aktiivsetele naistele.', 39.99, NULL);

-- Women Dresses & Skirts
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (8, 2, 2, 1, 'Adidas spordikleit', 'AVAILABLE', 'Mugav spordikleit Adidasele.', 69.99, NULL),
       (8, 3, 1, 1, 'Nike volditud seelik', 'AVAILABLE', 'Stiilne volditud seelik Nikelt.', 39.99, NULL);

-- Women Pants & Jeans
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (9, 2, 2, 1, 'Adidas kõrge värvliga teksad', 'AVAILABLE', 'Mugavad kõrge värvliga teksad Adidasele.', 59.99, NULL),
       (9, 3, 4, 1, 'Levis bootcut teksad', 'AVAILABLE', 'Klassikalised bootcut teksad Leviselt.', 69.99, NULL);

-- Women Outerwear
INSERT INTO item (category_id, size_id, brand_id, seller_id, name, status, description, price, buyer_id)
VALUES (10, 2, 3, 1, 'Carhartt jope', 'AVAILABLE', 'Soojustatud naiste jope Carharttilt.', 89.99, NULL),
       (10, 3, 1, 1, 'Nike kerge tuulejope', 'AVAILABLE', 'Kerge tuulejope Nikelt.', 79.99, NULL);

-- Pictures for items
-- INSERT INTO picture (item_id, file_name)
-- VALUES (3, 'admin_user/pants1.jpg'),
--        (3, 'admin_user/pants2.jpg')

