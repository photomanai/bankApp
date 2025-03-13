const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
const cardRouter = require("./cardRouter");
const { verify } = require("../middleware/authMiddleware");

router.use("/auth", authRouter);
router.use("/card", verify, cardRouter);

module.exports = router;
