//DO require needed modules
const router = require("express").Router();
const CharityMovementModel = require("../models/CharityMovement.model");
const jwt = require("jsonwebtoken");

//* ============================================================================
//*   GET ALL CHARITY ELECTIONS SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {
  try {
    const response = await CharityMovementModel.find().select("ownerID, charityID, date, amount, charityStatus");
    res.json(response);
  } catch (err) {
    next(err);
  }
});











//DO export module
module.exports = router;
