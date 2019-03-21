CREATE TABLE Site (
  sid int PRIMARY KEY,
  name varchar(100) NOT NULL,
  phone_number varchar(11),
  hours varchar(1000),
  street varchar(100) NOT NULL,
  postal_code varchar(6) NOT NULL,
  city varchar(100) NOT NULL,
  country varchar(100) NOT NULL,
  service varchar(100) NOT NULL,
  FOREIGN KEY (city) REFERENCES City
);

CREATE TABLE City (
  cid int PRIMARY KEY,
  city varchar(100)
);

INSERT INTO City
VALUES
  (1, 'Vancouver'),
  (2, 'Burnaby'),
  (3, 'Surrey'),
  (4, 'Richmond'),
  (5, 'New Westminster'),
  (6, 'Port Coquitlam');