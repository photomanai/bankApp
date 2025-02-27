const express = require("express");

const router = express.Router();

const card = require("../controller/cardConstroller");

router.post("/create", card.create);

module.exports = router;
