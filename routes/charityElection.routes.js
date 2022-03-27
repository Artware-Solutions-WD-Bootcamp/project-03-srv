//DO require needed modules
const router = require("express").Router();
const CharityModel = require("../models/Charity.model");
const CharityElectionModel = require("../models/CharityElection.model");
const UserModel = require("../models/User.model")
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//* ============================================================================
//*   GET ALL CHARITY ELECTIONS SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {
  try {
    const response = await CharityElectionModel.find().select("ownerID charityID date points").populate("ownerID charityID");
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   GET CHARITY ELECTIONS DETAILS SECTION
//* ============================================================================
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const charityElectionsData = await CharityElectionModel.findById(id);
    const { ownerID, charityID, date, points } = charityElectionsData;

    const charityData = await CharityModel.findById(charityID);
    const charityName = charityData.name
    const charityLogo = charityData.logo
    
    const userData = await UserModel.findById(ownerID);
    const userName = userData.username

    const returnCharityElectionData = { ownerID, charityID, date, points, charityName, charityLogo, userName };
    res.json(returnCharityElectionData);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   ADD NEW CHARITY ELECTION SECTION
//* ============================================================================
router.post("/", isAuthenticated, async (req, res, next) => {
  const { ownerID, charityID, date, points } = req.body;

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!ownerID || !charityID || !date || !points) {
    res.status(400).json({
      errorMessage: "Add charity election failed! Fields marked with * are mandatory! Please fill them all...",
    });
    return;
  }

  //DO if all validations were passed create the charity election
  try {
    await CharityElectionModel.create({
      ownerID,
      charityID,
      date,
      points,
    });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   UPDATE CHARITY ELECTION SECTION
//* ============================================================================
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  
  const { id } = req.params;
  const { ownerID, charityID, date, points } = req.body;

//! ==========================================================================
//!   BACKEND VALIDATIONS
//! ==========================================================================
  //? verify if user filled all mandatory information
  if (!ownerID || !charityID || !date || !points) {
    res.status(400).json({
      errorMessage: "Add charity election failed! Fields marked with * are mandatory! Please fill them all...",
    });
    return;
  }


//DO if all validations were passed create the charity cause
try {
  await CharityElectionModel.findByIdAndUpdate(id, { ownerID, charityID, date, points });
  res.json("Charity election updated");
} catch (err) {
  next(err);
}
});

//* ============================================================================
//*   DELETE CHARITY ELECTION SECTION
//* ============================================================================
router.delete("/:id", isAuthenticated, async (req, res, next) => {
const { id } = req.params;

try {
  await CharityElectionModel.findByIdAndDelete(id);
  res.json("Charity election deleted");
} catch (err) {
  next(err);
}
});

//DO export module
module.exports = router;
