require("dotenv").config({ path: __dirname + "/../.env" });

const mongoose = require("mongoose");
const mongoDb = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDb);
    console.log("MongoDB successfully connected");
  } catch (e) {
    console.error("MonogDB have error: " + e);
    process.exit(1);
  }
};

connectDB();
