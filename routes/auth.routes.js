//DO 1. require needed modules
const router = require("express").Router();
const { json } = require("express/lib/response");
const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//DO 2. create needed routes
//* ============================================================================
//* REGISTER SECTION
//* ============================================================================
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("auth.routes /register data:", username, email, password );

  //! Backend validators

  //! validate if user fills all mandatory information
  if (!username || !email || !password) {
    res.status(400).json({
      errorMessage: "All fields are mandatory! Please fill them all!",
    });
    return;
  }

  try {
    //! verify if username has already been registered
    const foundUser = await UserModel.findOne({ username });
    if (foundUser) {
      res.status(400).json({
        errorMessage:
          "This username is already in use. Please try with another one!",
      });
      return;
    }

    //! if all validations were passed create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//* LOGIN SECTION
//* ============================================================================
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  //! Backend validators
  if (!username || !password) {
    res.status(400).json({
      errorMessage: "All fields are mandatory! Please fill them all!",
    });
    return;
  }

  //! Credentials validators
  try {
    const foundUser = await UserModel.findOne({ username });

    if (!foundUser) {
      res.status(401).json({ errorMessage: "User not found!" });
      return;
    }

    //! if user exists, validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({
        errorMessage: "Bad username or password",
      });
      return;
    }

    //! if all correct, create and send Token
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      level: foundUser.level,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken });
  } catch (err) {
    next(err);
  }
});

//DO 3. export module
module.exports = router;
