const express = require("express");

const router = express.Router();

const controller = require("../controllers/cardConstroller");
const { verify } = require("../middleware/authMiddleware");

router.post("/create", verify, controller.create);
router.post("/call", verify, controller.callCards);
router.post("/get-money", verify, controller.getMoney);
router.post("/add-money", verify, controller.addMoney);

module.exports = router;
