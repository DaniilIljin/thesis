INSERT INTO location (name, address, description)
VALUES ('Nilat', 'Akadeemia tee', 'Closest plase');

INSERT INTO category (name, description, location_id)
VALUES ('Package', 'Clean package', 1);

INSERT INTO category (name, description)
VALUES ('Electronics', 'All sorts of electronics');

INSERT INTO category (name, description)
VALUES ('BIO waste', 'All organic waste');

INSERT INTO sub_category (name, description, category_id)
VALUES ('Bottles', 'Clean bottles', 1);

INSERT INTO sub_category (name, description, category_id)
VALUES ('Plastic', 'Plastic packaging', 1);

INSERT INTO item (name, description, sub_category_id)
VALUES ('Glass bottle', 'Package must be clean', 1);