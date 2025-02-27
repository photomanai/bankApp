const express = require("express");

const router = express.Router();

const controller = require("../controllers/cardConstroller");
const { verify } = require("../middleware/authMiddleware");

router.post("/create", verify, controller.create);

module.exports = router;
