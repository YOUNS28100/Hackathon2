CREATE TABLE skin (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type VARCHAR(150) NOT NULL
);

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  latitutde VARCHAR(255),
  longitude VARCHAR(255),
  skin_id_1 INT NOT NULL,
  skin_id_2 INT,
  skin_id_3 INT
);

create table category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);
create table sub_category (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);
create table product (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  image VARCHAR(255) NOT NULL,
  product_url VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  sub_cat_id_1 INT NOT NULL,
  sub_cat_id_2 INT,
  sub_cat_id_3 INT,
  skin_id_1 INT NOT NULL,
  skin_id_2 INT,
  skin_id_3 INT

);
