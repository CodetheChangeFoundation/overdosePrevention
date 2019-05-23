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
  lat varchar(20) NOT NULL,
  lon varchar(20) NOT NULL,
  FOREIGN KEY (cid) REFERENCES City(cid)
);

CREATE TABLE City (
  cid int PRIMARY KEY,
  city varchar(100),
  lat varchar(20) NOT NULL,
  lon varchar(20) NOT NULL
);

DROP TABLE City;
DROP TABLE Site;

INSERT INTO City
VALUES
  (1, "Vancouver", "49.2827", "-123.1207"),
  (2, "Burnaby", "49.2488",  "-122.9805"),
  (3, "Surrey", "49.1913", "-122.8490"),
  (4, "Richmond", "49.1666", "-123.1336"),
  (5, "New Westminster", "49.2057", "-122.9110"),
  (6, "Port Coquitlam", "49.2628", "-122.7811");

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
    "Supervised Injection",
    "49.281524",
    "-123.101250"
  );

SELECT * FROM Site;
SELECT * FROM City;