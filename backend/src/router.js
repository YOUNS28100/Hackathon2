const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const productRouter = require("./routers/productRouter");
const skinRouter = require("./routers/skinRouter");
const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const subCategoryRouter = require("./routers/subCategoryRouter");
const authRouter = require("./routers/authRouter");
const chatRouter = require("./routers/chatRouter");

router.use("/product", productRouter);
router.use("/skin", skinRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/sub_category", subCategoryRouter);
router.use("/login", authRouter);
router.use("/chat", chatRouter);

/* ************************************************************************* */

module.exports = router;
