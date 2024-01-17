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
  skin_id_1 INT UNSIGNED NOT NULL,
  skin_id_2 INT UNSIGNED,
  skin_id_3 INT UNSIGNED 
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
  category_id INT  UNSIGNED NOT NULL,
  sub_cat_id_1 INT  UNSIGNED NOT NULL,
  sub_cat_id_2 INT UNSIGNED,
  sub_cat_id_3 INT UNSIGNED,
  skin_id_1 INT  UNSIGNED NOT NULL,
  skin_id_2 INT UNSIGNED,
  skin_id_3 INT UNSIGNED 
);

-- FOREIGN KEYS

-- USER-SKIN
ALTER TABLE user ADD CONSTRAINT skin_id_1 FOREIGN KEY (`skin_id_1`)
    REFERENCES skin (id);

ALTER TABLE user ADD CONSTRAINT skin_id_2 FOREIGN KEY (`skin_id_2`)
    REFERENCES skin (id);

ALTER TABLE user ADD CONSTRAINT skin_id_3 FOREIGN KEY (`skin_id_3`)
    REFERENCES skin (id);

-- PRODUCT-SKIN
ALTER TABLE product ADD CONSTRAINT skin_id_1 FOREIGN KEY (`skin_id_1`)
    REFERENCES skin (id);

ALTER TABLE product ADD CONSTRAINT skin_id_2 FOREIGN KEY (`skin_id_2`)
    REFERENCES skin (id);

ALTER TABLE product ADD CONSTRAINT skin_id_3 FOREIGN KEY (`skin_id_3`)
    REFERENCES skin (id);

-- PRODUCT-CATEGORY
ALTER TABLE product ADD CONSTRAINT product_category FOREIGN KEY (`category_id`)
    REFERENCES category (id);

-- PRODUCT-SUB CATEGORY
ALTER TABLE product ADD CONSTRAINT product_sub_category_1 FOREIGN KEY (`sub_cat_id_1`)
    REFERENCES sub_category (id);

ALTER TABLE product ADD CONSTRAINT product_sub_category_2 FOREIGN KEY (`sub_cat_id_2`)
    REFERENCES sub_category (id);

ALTER TABLE product ADD CONSTRAINT product_sub_category_3 FOREIGN KEY (`sub_cat_id_3`)
    REFERENCES sub_category (id);


