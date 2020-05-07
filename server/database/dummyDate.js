const connection = require('./connection');

const { v4: uuidv4 } = require('uuid');

const gid = uuidv4();

const sql = `INSERT INTO users
(gid,
user_name,
phone,
birth_date,
email,
university,
address,
role,
profession,
password)
values
('${uuidv4()}', 'Ahmad', '123456789', '1-1-1992', 'ahmad@github.com', 'PPU', 'Hebron', 'user', 'CSE', 'abcabc');

INSERT INTO users
(gid,
user_name,
phone,
birth_date,
email,
university,
address,
role,
profession,
password)
values
('${uuidv4()}','Ali', '987654321', '1-1-1992', 'ali@github.com', 'PPU', 'HEBRON', 'user', 'IT', '123123');

INSERT INTO users
(gid,
user_name,
phone,
birth_date,
email,
university,
address,
role,
profession,
password)
values
('${uuidv4()}','Admin', '987654321', '1-1-1990', 'admin@gsa.com', '-', 'GAZA', 'Admin', 'IT', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Code Academy');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Freelancers');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','start up');

INSERT INTO category
(gid,catg_name)
values('${uuidv4()}','Public');

INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','Coding for everyone', '1', 'abcdefghijklmnobqrstvwxyz', '1-10-2019', '2:00:00', 'Hebron', 'GSG');

INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop', '1', 'abcdefghijklmnobqrstvwxyz', '7-20-2020', '9:00:00', 'Hebron', 'YDRC');



INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop 123', '2', 'abcdefghijklmnobqrstvwxyz', '4-26-2020', '3:00:00', 'Hebron', 'YDRC');


INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop 22', '2', 'abcdefghijklmnobqrstvwxyz', '4-29-2020', '4:00:00', 'Hebron', 'YDRC');


INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop 3333', '3', 'abcdefghijklmnobqrstvwxyz', '4-28-2020', '5:00:00', 'Hebron', 'YDRC');


INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop 33', '3', 'abcdefghijklmnobqrstvwxyz', '5-5-2020', '5:00:00', 'Hebron', 'YDRC');


INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop 44', '4', 'abcdefghijklmnobqrstvwxyz', '4-30-2020', '5:00:00', 'Hebron', 'YDRC');


INSERT INTO events
(
gid,
title,
category_id,
description,
event_date,
event_time,
event_location,
host )
values
('${uuidv4()}','JS workshop', '1', 'abcdefghijklmnobqrstvwxyz', '6-14-2020', '5:00:00', 'Hebron', 'YDRC');


`;

connection
  .query(sql)
  .then(() => console.log('Add Data!'))
  .catch((e) => console.error('failed to build', e.stack));
