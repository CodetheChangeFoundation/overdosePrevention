CREATE TABLE Site (
  sid int PRIMARY KEY,
  name varchar(100) NOT NULL,
  phone_number varchar(11),
  hours varchar(1000),
  street varchar(100) NOT NULL,
  postal_code varchar(6) NOT NULL,
  cid int NOT NULL,
  province varchar(100) NOT NULL,
  country varchar(100) NOT NULL,
  service varchar(100) NOT NULL,
  FOREIGN KEY (cid) REFERENCES City(cid)
);

CREATE TABLE City (
  cid int PRIMARY KEY,
  city varchar(100)
);

DROP TABLE City;
DROP TABLE Site;

INSERT INTO City
VALUES
  (1, 'Vancouver'),
  (2, 'Burnaby'),
  (3, 'Surrey'),
  (4, 'Richmond'),
  (5, 'New Westminster'),
  (6, 'Port Coquitlam');

INSERT INTO Site
VALUES
  (
    1,
    "Insite Supervised Injection Site",
    "6046877483",
    "Sunday	9a.m.–3a.m.
    Monday	9a.m.–3a.m.
    Tuesday	9a.m.–3a.m.
    Wednesday	9a.m.–3a.m.
    Thursday	9a.m.–3a.m.
    Friday 9a.m.–3a.m.
    Saturday	9a.m.–3a.m.",
    "139 E Hastings St",
    "V6A1N5",
    1,
    "BC",
    "Canada",
    "Supervised Injection"
  );

SELECT * FROM Site;
SELECT * FROM City;