const express = require("express");

const router = express.Router();

const controller = require("../controller/authConstroller");

router.post("/check", controller.check);
router.post("/login");
router.post("/register");

module.exports = router;
