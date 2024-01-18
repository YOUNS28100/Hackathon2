const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../controllers/userControllers");

const { hash } = require("../middlewares/hashPassword");

router.get("/", browse);
router.get("/:id", read);
router.post("/", hash, add);
router.put("/:id", hash, edit);
router.delete("/:id", destroy);

module.exports = router;
