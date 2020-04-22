BEGIN;

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  guid UNIQUEIDENTIFIER PRIMARY KEY default NEWID() ,
  phone VARCHAR(12),
  birth_date DATE,
  email VARCHAR(30),
  university VARCHAR(30),
  address VARCHAR(100),
  role VARCHAR(30),
  profession VARCHAR(30),
  password VARCHAR(30),
  email_activate Boolean,
  phone_activate Boolean
);

CREATE TABLE events(
    id SERIAL PRIMARY KEY NOT NULL,
    guid INT,
    title VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    event_location TEXT NOT NULL,
    event_status BOOLEAN,
    host TEXT NOT NULL,
    member_cnt INT,
    attendance_cnt INT
);

CREATE TABLE userEvent(
    id SERIAL PRIMARY KEY NOT NULL,
    guid INT,
    event_id INT,
    user_id INT,
    code VARCHAR(6),
    attendance_status BOOLEAN,
    note TEXT

);

CREATE TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    catg_name VARCHAR(20) NOT NULL,
    guid INT
);

COMMIT;