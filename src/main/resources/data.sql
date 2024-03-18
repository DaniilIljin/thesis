INSERT INTO location (name, address, description)
VALUES ('Nilat', 'Akadeemia tee', 'Closest plase');

INSERT INTO category (name, description, location_id)
VALUES ('Package', 'Clean package', 1);

INSERT INTO category (name, description)
VALUES ('Glass', 'All types of glass');

INSERT INTO category (name, description)
VALUES ('Old Paper', 'JUst any type of old paper');

INSERT INTO sub_category (name, description, category_id)
VALUES ('Bottles', 'Clean bottles', 1);

INSERT INTO sub_category (name, description, category_id)
VALUES ('Plastic boxes', 'Any size plastic boxes', 1);

INSERT INTO item (name, description, sub_category_id)
VALUES ('Glass bottle', 'Package must be clean', 1);