const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
const cardRouter = require("./cardRouter");

router.use("/auth", authRouter);
router.use("/card", cardRouter);

module.exports = router;
