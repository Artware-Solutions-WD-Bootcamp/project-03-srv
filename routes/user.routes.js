//DO require needed modules
const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  console.log("user.routes req.payload", req.payload);

  try {
    const response = await UserModel.find().select("username");
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { username, email, password, level, avatar } = req.body;
  console.log("user.routes /new user data:", username, email, password, level, avatar );

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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserModel.findById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await UserModel.findByIdAndDelete(id);
    res.json("User deleted");
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {

  const { id } = req.params
  const { username, email, password, level, avatar } = req.body

  try{

    const response = await UserModel.findByIdAndUpdate(id, { username, email, password, level, avatar })
    res.json("User updated")

  }catch(err){
    next(err)
  }
})

//DO export module
module.exports = router;
