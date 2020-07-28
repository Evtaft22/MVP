DROP DATABASE IF EXISTS mvp;
CREATE DATABASE mvp;

USE mvp;

CREATE TABLE favorites (
  id INT AUTO_INCREMENT,
  title VARCHAR(50),
  year INT,
  rated VARCHAR(10),
  released VARCHAR(20),
  runtime VARCHAR(10),
  genre VARCHAR(50),
  director VARCHAR(20),
  actors VARCHAR(100),
  plot VARCHAR(500),
  poster VARCHAR(500),
  rating VARCHAR(20),
  Primary Key (id)
);


-- mysql -u root < schema.sql