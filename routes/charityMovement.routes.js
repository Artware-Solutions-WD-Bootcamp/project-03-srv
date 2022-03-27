//DO require needed modules
const router = require("express").Router();
const CharityMovementModel = require("../models/CharityMovement.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");


//* ============================================================================
//*   GET ALL CHARITY MOVEMENTS SECTION
//* ============================================================================
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await CharityMovementModel.find().select("ownerID charityID date amount charityStatus").populate("ownerID charityID");
    res.json(response);
  } catch (err) {
    next(err);
  }
});


//DO export module
module.exports = router;
