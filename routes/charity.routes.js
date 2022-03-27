//DO require needed modules
const router = require("express").Router();
const CharityModel = require("../models/Charity.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//* ============================================================================
//*   GET ALL CHARITY CAUSES SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {
  try {
    const response = await CharityModel.find().select("name description url logo active visible assignedAmount deliveryProof");
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   CHARITY CAUSE DETAILS SECTION
//* ============================================================================
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await CharityModel.findById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   ADD NEW CHARITY CAUSE SECTION
//* ============================================================================
router.post("/", isAuthenticated, async (req, res, next) => {
  const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = req.body;

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Add cause failed! Fields marked with * are mandatory! Please fill them all...",
    });
    return;
  }

  //DO if all validations were passed create the charity cause
  try {

    await CharityModel.create({
      name,
      description,
      url,
      logo,
      active,
      visible,
      assignedAmount,
      deliveryProof,
    });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   UPDATE CHARITY CAUSE SECTION
//* ============================================================================
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  
    const { id } = req.params;
    const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = req.body;
  
  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Update cause failed! Fields marked with * are mandatory! Please fill them all...",
    });  
    return;
  }  
  
  //DO if all validations were passed create the charity cause
  try {
    await CharityModel.findByIdAndUpdate(id, { name, description, url, logo, active, visible, assignedAmount, deliveryProof });
    res.json("Cause updated");
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   DELETE CHARITY CAUSE SECTION
//* ============================================================================
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await CharityModel.findByIdAndDelete(id);
    res.json("Cause deleted");
  } catch (err) {
    next(err);
  }
});

//DO export module
module.exports = router;
