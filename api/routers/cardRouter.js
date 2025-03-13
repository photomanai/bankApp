const express = require("express");

const router = express.Router();

const controller = require("../controllers/cardConstroller");
const { verify } = require("../middleware/authMiddleware");

router.post("/create", controller.create);
router.post("/call", controller.callCards);
router.post("/add-money", controller.addMoney);
router.post("/get-money", controller.getMoney);
router.post("/send-money", controller.sendMoney);

module.exports = router;
