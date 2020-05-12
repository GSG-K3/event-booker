const connection = require('./connection');

const { v4: uuidv4 } = require('uuid');

const { addUser } = require('./query/user');

const { ROLE } = require('../helpers/Constants');

const sql = `

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
('${uuidv4()}','JS workshop', '1', 'abcdefghijklmnobqrstvwxyz', '6-14-2020', '5:00:00', 'Hebron', 'YDRC');`;

connection
  .query(sql)
  .then(() => console.log('Add Data!'))
  .catch((e) => console.error('failed to build', e.stack));

addUser({
  name: 'Admin',
  phone: '059000000',
  email: 'admin@no.com',
  password: 'Gs123456',
  selectedDate: '1/1/2000',
  role: ROLE.ADMIN,
});

addUser({
  name: 'test',
  phone: '051000000',
  email: 'test@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't1',
  phone: '051000000',
  email: 't1@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't2',
  phone: '051000000',
  email: 't2t@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't3',
  phone: '051000000',
  email: 't3@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't4',
  phone: '051000000',
  email: 't4@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't5',
  phone: '051000000',
  email: 't5@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't6',
  phone: '051000000',
  email: 't6@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't7',
  phone: '051000000',
  email: 't7@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});

addUser({
  name: 't8',
  phone: '051000000',
  email: 't8@no.com',
  password: 'Gs123456',
  selectedDate: '10/10/2010',
  role: ROLE.USER,
});
