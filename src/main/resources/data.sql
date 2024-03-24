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

INSERT INTO binstation (latitude, longitude, title, address, email, phone, description, categories, image_url, opening_times)
VALUES
    (58.3829, 24.4993, 'Pärnu Central Station', 'Central Square, Pärnu, Estonia', 'info@parnustation.com', '+372 12345678', 'Main waste collection point in Pärnu', '{"PLASTIC", "METAL", "TEXTILE", "GLASS"}', 'https://example.com/parnu-central-station.jpg', '[{"dayOfWeek": 1, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 2, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 3, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 4, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 5, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 6, "openingTime": "09:00", "closingTime": "15:00"}, {"dayOfWeek": 0, "openingTime": "", "closingTime": ""}]'),

    (58.3853, 24.4938, 'Pärnu Beach Promenade Bin', 'Beach Promenade, Pärnu, Estonia', 'beachbins@parnu.com', '+372 98765432', 'Bin for beach litter collection', '{"TEXTILE", "PLASTIC" }', 'https://example.com/parnu-beach-bin.jpg', '[{"dayOfWeek": 1, "openingTime": "09:00", "closingTime": "17:00"}, {"dayOfWeek": 2, "openingTime": "09:00", "closingTime": "17:00"}, {"dayOfWeek": 3, "openingTime": "09:00", "closingTime": "17:00"}, {"dayOfWeek": 4, "openingTime": "09:00", "closingTime": "17:00"}, {"dayOfWeek": 5, "openingTime": "09:00", "closingTime": "17:00"}, {"dayOfWeek": 6, "openingTime": "10:00", "closingTime": "14:00"}, {"dayOfWeek": 0, "openingTime": "", "closingTime": ""}]'),

    (58.3735, 24.5112, 'Pärnu Residential Area Bin', 'Residential Area, Pärnu, Estonia', 'residentialbins@parnu.com', '+372 56789012', 'Bin for residential waste collection', '{"GLASS", "PLASTIC"}', 'https://example.com/parnu-residential-bin.jpg', '[{"dayOfWeek": 1, "openingTime": "07:00", "closingTime": "20:00"}, {"dayOfWeek": 2, "openingTime": "07:00", "closingTime": "20:00"}, {"dayOfWeek": 3, "openingTime": "07:00", "closingTime": "20:00"}, {"dayOfWeek": 4, "openingTime": "07:00", "closingTime": "20:00"}, {"dayOfWeek": 5, "openingTime": "07:00", "closingTime": "20:00"}, {"dayOfWeek": 6, "openingTime": "08:00", "closingTime": "18:00"}, {"dayOfWeek": 0, "openingTime": "10:00", "closingTime": "16:00"}]'),

    (59.4370, 24.7536, 'Tallinn Old Town Bin', 'Old Town, Tallinn, Estonia', 'oldtallinnbins@example.com', '+372 11112222', 'Bin for historical district waste collection', '{"PAPER_FIBREBOARD_CARTON", "PLASTIC", "GLASS"}', 'https://example.com/tallinn-oldtown-bin.jpg', '[{"dayOfWeek": 1, "openingTime": "08:30", "closingTime": "17:30"}, {"dayOfWeek": 2, "openingTime": "08:30", "closingTime": "17:30"}, {"dayOfWeek": 3, "openingTime": "08:30", "closingTime": "17:30"}, {"dayOfWeek": 4, "openingTime": "08:30", "closingTime": "17:30"}, {"dayOfWeek": 5, "openingTime": "08:30", "closingTime": "17:30"}, {"dayOfWeek": 6, "openingTime": "", "closingTime": ""}, {"dayOfWeek": 0, "openingTime": "", "closingTime": ""}]'),

    (59.4369, 24.7536, 'Tallinn City Center Bin', 'City Center, Tallinn, Estonia', 'citycenterbins@example.com', '+372 33334444', 'Main waste collection point in Tallinn', '{"PLASTIC", "METAL", "GLASS"}', 'https://example.com/tallinn-citycenter-bin.jpg', '[{"dayOfWeek": 1, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 2, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 3, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 4, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 5, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 6, "openingTime": "00:00", "closingTime": "23:59"}, {"dayOfWeek": 0, "openingTime": "00:00", "closingTime": "23:59"}]');
