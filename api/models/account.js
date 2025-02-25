const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  fin: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sirname: { type: String, required: true },
  num: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const account = mongoose.model("account", accountSchema);

module.exports = account;
