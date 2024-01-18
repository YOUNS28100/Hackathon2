-- FOREIGN KEYS

-- USER-SKIN
ALTER TABLE user ADD CONSTRAINT user_skin_id_1 FOREIGN KEY (`skin_id_1`)
    REFERENCES skin(id);

ALTER TABLE user ADD CONSTRAINT user_skin_id_2 FOREIGN KEY (`skin_id_2`)
    REFERENCES skin(id);

ALTER TABLE user ADD CONSTRAINT user_skin_id_3 FOREIGN KEY (`skin_id_3`)
    REFERENCES skin(id);

-- PRODUCT-SKIN
ALTER TABLE product ADD CONSTRAINT productId_1 FOREIGN KEY (`skinId_1`)
    REFERENCES skin(id);

ALTER TABLE product ADD CONSTRAINT productId_2 FOREIGN KEY (`skinId_2`)
    REFERENCES skin(id);

ALTER TABLE product ADD CONSTRAINT productId_3 FOREIGN KEY (`skinId_3`)
    REFERENCES skin(id);

-- PRODUCT-CATEGORY
ALTER TABLE product ADD CONSTRAINT product_category FOREIGN KEY (`category_id`)
    REFERENCES category(id);

-- PRODUCT-SUB CATEGORY
ALTER TABLE product ADD CONSTRAINT product_sub_category_1 FOREIGN KEY (`sub_cat_id_1`)
    REFERENCES sub_category(id);

ALTER TABLE product ADD CONSTRAINT product_sub_category_2 FOREIGN KEY (`sub_cat_id_2`)
    REFERENCES sub_category(id);

ALTER TABLE product ADD CONSTRAINT product_sub_category_3 FOREIGN KEY (`sub_cat_id_3`)
    REFERENCES sub_category(id);
