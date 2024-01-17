CREATE TABLE skin (
    id int unsigned primary key auto_increment not null,
    type VARCHAR(150) NOT NULL
);

CREATE TABLE user (
  id int unsigned primary key auto_increment not null,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  coord_x VARCHAR(255),
  coord_y VARCHAR(255),
  skin_id_1 INT NOT NULL,
  skin_id_2 INT,
  skin_id_3 INT
);

create table category (
  id int unsigned primary key auto_increment not null,
  name VARCHAR(255) NOT NULL
);
create table sub_category (
  id int unsigned primary key auto_increment not null,
  name VARCHAR(255) NOT NULL
);
create table product (
  id int unsigned primary key auto_increment not null,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  image VARCHAR(255) NOT NULL,
  product_url VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  sub_cat_1 INT NOT NULL,
  sub_cat_2 INT,
  sub_cat_3 INT,
  skin_type_1 INT NOT NULL,
  skin_type_2 INT
);
