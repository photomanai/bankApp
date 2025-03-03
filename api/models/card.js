const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  digits: { type: String, required: true, unique: true },
  cvv: { type: String, required: true },
  date: { type: String, required: true },
  createdBy: { type: String, required: true },
  balance: { type: Number, required: true },
});

const card = mongoose.model("card", cardSchema);

module.exports = card;
