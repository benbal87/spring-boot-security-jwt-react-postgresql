INSERT INTO roles (name)
VALUES ('ROLE_USER');
INSERT INTO roles (name)
VALUES ('ROLE_ADMIN');

INSERT INTO users (id, email, password, username)
VALUES (1, 'admin@admin.com', '$2a$10$vOGvoOOaTtUZYoZTTl..IOF01JxNJJQ19DdtM6T41kV3gfkTn3rvi', 'admin');

INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'));
INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'ROLE_USER'));

INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (1, (SELECT id FROM users WHERE username = 'admin'), 20, '2020-04-01');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (2, (SELECT id FROM users WHERE username = 'admin'), 45, '2020-04-02');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (3, (SELECT id FROM users WHERE username = 'admin'), 62, '2020-04-03');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (4, (SELECT id FROM users WHERE username = 'admin'), 73, '2020-04-04');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (5, (SELECT id FROM users WHERE username = 'admin'), 61, '2020-04-05');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (6, (SELECT id FROM users WHERE username = 'admin'), 41, '2020-04-06');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (7, (SELECT id FROM users WHERE username = 'admin'), 55, '2020-04-07');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (8, (SELECT id FROM users WHERE username = 'admin'), 46, '2020-04-08');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (9, (SELECT id FROM users WHERE username = 'admin'), 97, '2020-04-09');
INSERT INTO user_statistics (id, user_id, number_of_logins_per_day, stat_date)
VALUES (10, (SELECT id FROM users WHERE username = 'admin'), 88, '2020-04-10');

SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles) + 1);
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users) + 1);
SELECT setval('user_statistics_id_seq', (SELECT MAX(id) FROM user_statistics) + 1);

-- SELECT nextval('user_statistics_id_seq');
-- SELECT MAX(id) FROM user_statistics;

-- DROP TABLE roles CASCADE;
-- DROP TABLE user_roles CASCADE;
-- DROP TABLE users CASCADE;
-- DROP TABLE user_statistics CASCADE;
-- DROP TABLE user_financials CASCADE;

-- SELECT * FROM roles;
-- SELECT * FROM user_roles;
-- SELECT * FROM users;
-- SELECT * FROM user_statistics;
-- SELECT * FROM user_financials;
