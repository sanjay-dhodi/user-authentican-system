require("dotenv").config();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ############ sign up ########################
const signup = async (req, resp) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return resp.json("req body is empty");
    }

    const email = req.body.email;
    const password = req.body.password;

    if (email === "" || password === "") {
      return resp.json("email or password is empty");
    }

    // check exististing user
    const existingUser = await userModel.find({ email: email });

    if (existingUser.length > 0) {
      return resp.json("email is already exists try with different email");
    }

    const hash = await bcrypt.hash(password, 12);

    const user = new userModel({
      email: email,
      password: hash,
    });

    // throw new Error("sss");
    user.save().then(() => {
      resp.status(201).json({ message: "user successfully register" });
    });
  } catch (error) {
    // console.log("sign up error" + error);
    resp.status(500).json("internal server error");
  }
};
// ############ login #######################
const login = async (req, resp) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return resp.json("req body is empty");
    }

    const email = req.body.email;
    const password = req.body.password;

    if (email === "" || password === "") {
      return resp.json("email or password is empty");
    }

    const foundUser = await userModel.findOne({ email: email });

    if (!foundUser) {
      return resp.json("user not found please sign up first");
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return resp.status(401).json("wrong password");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRETIME,
    });

    

    resp.status(200).json(token);
  } catch (error) {
    // console.log(error);
    resp.status(500).json("internal server error", error);
  }
};

module.exports = { signup, login };
