//DO require needed modules
const router = require("express").Router();
const CharityElectionModel = require("../models/CharityElection.model");
const CharityCauseModel = require("../models/CharityCause.model");
const jwt = require("jsonwebtoken");

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
    const response = await CharityElectionModel.findById(id);
    const { ownerID, charityID, date, points } = response;
    const returnCharityElectionData = { ownerID, charityID, date, points };
    res.json(returnCharityElectionData);
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   ADD NEW CHARITY ELECTION SECTION
//* ============================================================================
router.post("/", async (req, res, next) => {
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
router.patch("/:id", async (req, res, next) => {
  
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
router.delete("/:id", async (req, res, next) => {
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
