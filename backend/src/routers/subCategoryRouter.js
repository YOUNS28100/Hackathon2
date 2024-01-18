const express = require("express");

const router = express.Router();

const { browse, read } = require("../controllers/sub_categoryControllers");

router.get("/", browse);
router.get("/:id", read);

module.exports = router;
