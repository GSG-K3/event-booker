BEGIN;

    DROP TABLE IF EXISTS users, events, userEvent, category
    cascade;


-- create extension to user uuid_generate_v4 ()
--https://www.postgresql.org/docs/9.4/uuid-ossp.html
-- CREATE EXTENSION
-- IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid NOT NULL,
    --gid uuid NOT NULL DEFAULT uuid_generate_v4 (),
    user_name VARCHAR(100) NOT NULL,
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

CREATE TABLE category
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid NOT NULL,
    catg_name VARCHAR(20) NOT NULL
);

CREATE TABLE events
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid NOT NULL,
    title VARCHAR(100) NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id),
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_location TEXT NOT NULL,
    event_status BOOLEAN,
    host TEXT NOT NULL,
    member_cnt INT,
    attendance_cnt INT
);


CREATE TABLE userEvent
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid NOT NULL,
    event_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES events (id),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users (id),
    code VARCHAR(6),
    attendance_status bit,
    note TEXT

);

COMMIT;