
CREATE TABLE category
(
  id       INT     NOT NULL,
  cat_name VARCHAR NOT NULL,
  id       INT     NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Product
(
  id            INT     NOT NULL,
  name          VARCHAR NOT NULL,
  prod_categ_id INT     NOT NULL,
  price         FLOAT   NOT NULL,
  img           VARCHAR NOT NULL,
  link          VARCHAR NOT NULL,
  id            INT     NOT NULL,
  cat_id        INT     NOT NULL,
  sub_cat_1     INT     NOT NULL,
  sub_cat_2     INT     NULL    ,
  sub_cat_3     INT     NULL    ,
  skin_type_1   INT     NOT NULL,
  skin_type_2   INT     NULL    ,
  id            INT     NOT NULL,
                        NOT NULL,z
  PRIMARY KEY (id)
);

CREATE TABLE skin
(
  id   INT     NOT NULL,
  type VARCHAR NOT NULL,
  id   INT     NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sub_categ
(
  id           INT NULL    ,
  sub_cat_name INT NULL    ,
                   NULL    ,
  PRIMARY KEY ()
);

CREATE TABLE user
(
  id         INT     NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name  VARCHAR NULL    ,
  email      VARCHAR NOT NULL COMMENT 'UNIQUE',
  password   VARCHAR NOT NULL,
  city       VARCHAR NOT NULL,
  lat                NULL    ,
  long               NULL    ,
  age                NOT NULL,
  id         INT     NOT NULL,
  skin_id_1  INT     NOT NULL COMMENT 'FOREIGN KEY',
  skin_id_2  INT     NULL    ,
  skin_id_3  INT     NULL    ,
  id         INT     NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE user
  ADD CONSTRAINT FK_skin_TO_user
    FOREIGN KEY (id)
    REFERENCES skin (id);

ALTER TABLE category
  ADD CONSTRAINT FK_Product_TO_category
    FOREIGN KEY (id)
    REFERENCES Product (id);

ALTER TABLE Product
  ADD CONSTRAINT FK_skin_TO_Product
    FOREIGN KEY (id)
    REFERENCES skin (id);

ALTER TABLE Product
  ADD CONSTRAINT FK_sub_categ_TO_Product
    FOREIGN KEY ()
    REFERENCES sub_categ ();
