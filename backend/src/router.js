const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const productRouter = require("./routers/productRouter");
const skinRouter = require("./routers/skinRouter");
const userRouter = require("./routers/userRouter");

router.use("/product", productRouter);
router.use("/skin", skinRouter);
router.use("/user", userRouter);

/* ************************************************************************* */

module.exports = router;
