const express = require("express");

const router = express.Router();

const { OpenChat } = require("../controllers/chatControllers");

router.post("/", OpenChat);

module.exports = router;
