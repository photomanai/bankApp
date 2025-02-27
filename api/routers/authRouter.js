const express = require("express");

const router = express.Router();

const controller = require("../controllers/authConstroller");

router.post("/check", controller.check);
router.post("/register", controller.register);
router.post("/login", controller.login);
//router.post("/refresh", controller.refresh);

module.exports = router;
