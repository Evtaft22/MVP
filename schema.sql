DROP DATABASE IF EXISTS mvp;
CREATE DATABASE mvp;

USE mvp;

CREATE TABLE favorites (
  id int PRIMARY KEY AUTO_INCREMENT,
  title varchar(50),
  date varchar(50),
  rated varchar(50),
  released varchar(50),
  runtime varchar(50),
  genre varchar(50),
  director varchar(50),
  actors varchar(100),
  plot varchar(500),
  poster varchar(500),
  rating varchar(50),
  review varchar(250)
);


-- mysql -u root < schema.sql