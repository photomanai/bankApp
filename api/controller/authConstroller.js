const Account = require("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.check = async (req, res) => {
  try {
    const { fin } = req.body;

    const existingAccount = await Account.findOne({ fin });
    if (existingAccount) {
      res.status(201).json({
        message: "Login",
        haveAccount: true,
      });
    } else {
      res.status(201).json({
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

    const existingAccount = await Account.findOne({ fin, num });
    if (existingAccount) {
      return res.status(400).json({ message: "Number already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      name,
      sirname,
      password: hashedPass,
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

    const account = await Account.findOne({ num, fin });
    if (!account) {
      return res.status(400).json({ message: "Cannot find account" });
    }

    const isPassCorrect = await bcrypt.compare(password, account.password);
    if (isPassCorrect) {
      const token = jwt.sign(
        { accountId: account._id, fin: account.fin },
        process.env.JWT_TOKEN
      );

      res.status(200).json({
        message: "Login successful",
        accessToken: token,
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    console.error("Error during registration: ", e);
    res.status(500).json({ message: "Server error" });
  }
};
