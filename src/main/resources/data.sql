INSERT INTO location (id, name, address, description)
VALUES (1, 'Nilat', 'Akadeemia tee', 'Closest plase');

INSERT INTO category (name, description, location_id)
VALUES ('BIO', 'BIO waste', 1);

INSERT INTO category (id, name, description, location_id)
VALUES (1, 'Package', 'Clean package', 1);

INSERT INTO sub_category (id, name, description, category_id)
VALUES (1, 'Bottles', 'Clean bottles', 1);

INSERT INTO item ( name, description, sub_category_id)
VALUES ('Glass bottle', 'Package must be clean', 1);