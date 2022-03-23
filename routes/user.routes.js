//DO require needed modules
const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//* ============================================================================
//*   GET ALL USERS SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {

  try {
    const response = await UserModel.find().select("username email avatar");
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   GET USER DETAILS SECTION
//* ============================================================================
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserModel.findById(id);
    const { username, email, level, avatar } = response;
    const returnUserData = { username, email, level, avatar };
    res.json(returnUserData);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   ADD NEW USER SECTION
//* ============================================================================
router.post("/", async (req, res, next) => {
  const { username, email, password, level, avatar } = req.body;

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!username || !email || !password || !level) {
    res.status(400).json({
      errorMessage: "All fields are mandatory! Please fill them all!",
    });
    return;
  }

  try {
    //? verify if username has already been registered
    const foundUser = await UserModel.findOne({ username });
    if (foundUser) {
      res.status(400).json({
        errorMessage: "This username is already in use. Please try with another one!",
      });
      return;
    }

    //? verify if email has correct syntax
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    if (!passwordRegex.test(password)) {
      // console.log(passwordRegex.test(password));
      res.status(400).json({
        errorMessage: "The password don't meet the minimum security requirements! It MUST have at least one of: uppercase and lowercase letters, munbers and special characters...",
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
      level,
      avatar,
    });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   UPDATE USER SECTION
//* ============================================================================
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const loggedUserLevel = req.payload.level;
  const { id } = req.params;
  const { username, email, password, level, avatar } = req.body;

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  // //? verify if user filled all mandatory information
  if (!username || !email || !level) {
    res.status(400).json({
      errorMessage: "Username, email and level are mandatory! Please fill them all!",
    });
    return;
  }

  try {
/*
    //? verify if username has already been registered
    const foundUser = await UserModel.findOne({ username });
    if (foundUser && foundUser._id !== req.payload._id) {
      res.status(400).json({
        errorMessage: "This username is already in use. Please try with another one!",
      });
      return;
    }

    // //? verify if email has correct syntax
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
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
*/
    //DO if all validations were passed create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.findByIdAndUpdate(id, {
      username,
      email,
      password: hashedPassword,
      level,
      avatar,
    });
    res.json("User updated");
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   DELETE USER SECTION
//* ============================================================================
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    //! ==========================================================================
    //!   BACKEND VALIDATIONS
    //! ==========================================================================
    // here will apply future validations to avoid data corruption like deleting
    // user's Orders or Connections

    await UserModel.findByIdAndDelete(id);
    res.json("User deleted");
  } catch (err) {
    next(err);
  }
});

//DO export module
module.exports = router;
