BEGIN;

DROP TABLE IF EXISTS users, events, userEvent, category cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  guid uuid NOT NULL,
  phone VARCHAR(15) NOT NULL,
  birth_date DATE NOT NULL,
  email VARCHAR(100) NOT NULL,
  university VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  profession VARCHAR(500) NOT NULL,
  password TEXT NOT NULL,
  email_activate bit,
  phone_activate bit
);

CREATE TABLE events(
    id SERIAL PRIMARY KEY NOT NULL,
    guid uuid NOT NULL,
    title VARCHAR(100) NOT NULL,
    category_id INT NOT NULL FOREIGN KEY REFERENCES category,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_location TEXT NOT NULL,
    event_status BOOLEAN,
    host TEXT NOT NULL,
    member_cnt INT,
    attendance_cnt INT
);

CREATE TABLE userEvent(
    id SERIAL PRIMARY KEY NOT NULL,
    guid INT,
    event_id INT FOREIGN KEY REFERENCES events,
    user_id INT FOREIGN KEY REFERENCES users,
    code VARCHAR(6),
    attendance_status bit,
    note TEXT

);

CREATE TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    catg_name VARCHAR(20) NOT NULL,
    guid uuid NOT NULL
);

INSERT INTO users (
    user_name,
    phone,
    birth_date,
    email,
    university,
    address,
    role,
    profession,
    password) values ('Ahmad', '123456789', '1-1-1992','ahmad@github.com','PPU','Hebron','student', 'CSE', 'abcabc');


COMMIT;