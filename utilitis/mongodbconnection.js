require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(console.log("database connected"))
  .catch((err) => console.log("database connection problem " + err));
