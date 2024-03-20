
INSERT INTO rule (name, description)
VALUES ('General rules', 'General rules in estonia');

INSERT INTO location (name, address, description, rule_id)
VALUES ('Nilat', 'Akadeemia tee', 'Closest plase', 1);

INSERT INTO category (name, description, rule_id)
VALUES ('Package', 'Clean package', 1);

INSERT INTO category (name, description, rule_id)
VALUES ('Electronics', 'All sorts of electronics', 1);

INSERT INTO category (name, description, rule_id)
VALUES ('BIO waste', 'All organic waste', 1);

INSERT INTO sub_category (name, description, category_id)
VALUES ('Bottles', 'Clean bottles', 1);

INSERT INTO sub_category (name, description, category_id)
VALUES ('Plastic', 'Plastic packaging', 1);

INSERT INTO item (name, description, sub_category_id)
VALUES ('Glass bottle', 'Package must be clean', 1);