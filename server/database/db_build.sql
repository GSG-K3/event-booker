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
    category_id INTEGER NOT NULL, FOREIGN KEY (category_id) REFERENCES category (id),
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
    guid uuid NOT NULL,
    event_id INTEGER, FOREIGN KEY (event_id) REFERENCES events (id),
    user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users (id),
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
    
    
    INSERT INTO users (
    user_name,
    phone,
    birth_date,
    email,
    university,
    address,
    role,
    profession,
    password) values ('Ali', '987654321', '1-1-1992','ali@github.com','PPU','HEBRON','student', 'IT', '123123');

    INSERT INTO category (catg_name) values('Code Academy');
    INSERT INTO category (catg_name) values('Freelancers');
    INSERT INTO category (catg_name) values('start up');
    INSERT INTO category (catg_name) values('Public');

    INSERT INTO events (
    title,
    category_id,
    description,
    event_date,
    event_time,
    event_location,
    host ) values ('Coding for everyone', '1', 'abcdefghijklmnobqrstvwxyz', '1-1-2021', '5:00:00', 'Hebron', 'GSG');

    INSERT INTO events (
    title,
    category_id,
    description,
    event_date,
    event_time,
    event_location,
    host ) values ('JS workshop', '1', 'abcdefghijklmnobqrstvwxyz', '1-1-2022', '5:00:00', 'Hebron', 'YDRC');



COMMIT;