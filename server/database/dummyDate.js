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
('${gid}', 'Ahmad', '123456789', '1-1-1992', 'ahmad@github.com', 'PPU', 'Hebron', 'student', 'CSE', 'abcabc');

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
('${gid}','Ali', '987654321', '1-1-1992', 'ali@github.com', 'PPU', 'HEBRON', 'student', 'IT', '123123');

INSERT INTO category
(gid,catg_name)
values('${gid}','Code Academy');

INSERT INTO category
(gid,catg_name)
values('${gid}','Freelancers');

INSERT INTO category
(gid,catg_name)
values('${gid}','start up');

INSERT INTO category
(gid,catg_name)
values('${gid}','Public');

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
('${gid}','Coding for everyone', '1', 'abcdefghijklmnobqrstvwxyz', '1-1-2021', '5:00:00', 'Hebron', 'GSG');

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
('${gid}','JS workshop', '1', 'abcdefghijklmnobqrstvwxyz', '1-1-2022', '5:00:00', 'Hebron', 'YDRC');
`;

connection
  .query(sql)
  .then(() => console.log('build created successfully!'))
  .catch((e) => console.error('failed to build', e.stack));
