//DO require needed modules
const router = require("express").Router();
//const { json } = require("express/lib/response");
const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//DO create needed routes
//* ============================================================================
//*   REGISTER SECTION
//* ============================================================================
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  // console.log("auth.routes /register data:", username, email, password);

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================

  //? verify if user filled all mandatory information
  if (!username || !email || !password) {
    res.status(400).json({
      errorMessage: "Fields marked with * are mandatory! Please fill them all...",
    });
    return;
  }

  try {
    //? verify if username has already been registered
    const foundUser = await UserModel.findOne({ username });
    if (foundUser) {
      res.status(400).json({
        errorMessage:
          "This username is already in use. Please try with another one!",
      });
      return;
    }

    //? verify if email has correct syntax
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      // console.log(emailRegex.test(email));
      res.render("auth/signup.hbs", {
        errorMessage: "E-mail address is not correct! Please verify it...",
      });
      return;
    }

    //? verify if email has already been registered
    const foundEmail = await UserModel.findOne({ email });
    if (foundEmail) {
      res.status(400).json({
        errorMessage: `The ${email} mail address is already in use! Please use another one...`,
      });
      return;
    }

    //? verify if the password is in accordance with requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (!passwordRegex.test(password)) {
      // console.log(passwordRegex.test(password));
      res.status(400).json({
        errorMessage:
          "The password don't meet the minimum security requirements! It MUST have at least one of: uppercase and lowercase letters, munbers and special characters...",
      });
      return;
    }

    //DO if all validations were passed create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      level: "user",
      avatar: "",
    });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   LOGIN SECTION
//* ============================================================================
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  //! Backend validators
  if (!username || !password) {
    res.status(400).json({
      errorMessage: "Fields marked with * are mandatory! Please fill them all...",
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

//* ============================================================================
//*   VERIFY USER SECTION
//* ============================================================================
router.get("/verify", isAuthenticated, (req, res, next) => {

  // this route will verify if tue user has a valid token when returns to page
  res.status(200).json()
})

//DO export module
module.exports = router;
