const Account = require("../models/account");

module.exports.check = async (req, res) => {
  try {
    const { fin } = req.body;

    const existingAccount = await Account.findOne({ fin });
    if (existingAccount) {
      res.status(201).json({
        status: "success",
        message: "Login",
        haveAccount: true,
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "Register",
        haveAccount: false,
      });
    }
  } catch (e) {
    console.error("Error during registration: ", e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { name, sirname, password, fin, num } = req.body;

    const existingAccount = await Account.findOne({ num });
    if (existingAccount) {
      return res.status(400).json({ message: "Number already exists" });
    }

    const newAccount = new Account({
      name,
      sirname,
      password,
      fin,
      num,
    });

    await newAccount.save();
    res.status(201).json({ newAccount, message: "Register successful" });
  } catch (e) {
    console.error("Error during registration: ", e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { password, fin, num } = req.body;

    const existingAccount = await Account.findOne({ num });
    if (!existingAccount) {
      return res.status(400).json({ message: "Cannot find account" });
    }
  } catch (e) {
    console.error("Error during registration: ", e);
    res.status(500).json({ message: "Server error" });
  }
};
