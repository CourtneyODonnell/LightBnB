-- $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
-- example:
-- INSERT INTO reservations (start_date, end_date, property_id, guest_id)
-- VALUES ('2018-09-11', '2018-09-26', 1, 1),
-- ('2019-01-04', '2019-02-01', 2, 2),
-- ('2021-10-01', '2021-10-14', 3, 3);

NSERT INTO users (name, email, password)
VALUES ('', '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(‘’, '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('', '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(‘’, '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('', '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(‘’, '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('', '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(‘’, '', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, country, street, city, province, post_code)
VALUES ('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', ''),
('', '', ‘description’ '', '', , '', '', '', '', '');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , ),
('', '', , );

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (, , , , ''),
(, , , , ''),
(, , , , ''),
(, , , , ''),
(, , , , ''),
(, , , , ''),
(, , , , '');
