//DO require needed modules
const router = require("express").Router();
const CharityCauseModel = require("../models/CharityCause.model");
const jwt = require("jsonwebtoken");

//* ============================================================================
//*   GET ALL CHARITY CAUSES SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {
  try {
    const response = await CharityCauseModel.find().select("name description url logo active visible assignedAmount deliveryProof");
    // console.log("cause.routes.js base response: ", response)
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
    const response = await CharityCauseModel.findById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   ADD NEW CHARITY CAUSE SECTION
//* ============================================================================
router.post("/", async (req, res, next) => {
  const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = req.body;
  // console.log("ADD NEW CHARITY CAUSE SECTION info:", name, description, url, logo, active, visible, assignedAmount, deliveryProof);

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Add cause failed! Name and description are mandatory fields. Please fill them!",
    });
    return;
  }

  try {
    //DO if all validations were passed create the charity cause
    // console.log("Charity cause create info: ", name, description, url, logo, active, visible, assignedAmount, deliveryProof);

    await CharityCauseModel.create({
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
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = req.body;
  console.log(req.body);
  try {
    await CharityCauseModel.findByIdAndUpdate(id, { name, description, url, logo, active, visible, assignedAmount, deliveryProof });
    res.json("Cause updated");
  } catch (err) {
    next(err);
  }
});

//* ============================================================================
//*   DELETE CHARITY CAUSE SECTION
//* ============================================================================
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await CharityCauseModel.findByIdAndDelete(id);
    res.json("Cause deleted");
  } catch (err) {
    next(err);
  }
});

//DO export module
module.exports = router;
