//DO require needed modules
const router = require("express").Router();
const CollabModel = require("../models/Collab.model");


//* ============================================================================
//*   GET ALL COLLABORATORS SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {

  try {
    const response = await CollabModel.find().select("name description registerUrl logo visibility");
    res.json(response);
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   COLLABORATOR DETAILS SECTION
//* ============================================================================
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await CollabModel.findById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   ADD NEW COLLABORATOR SECTION
//* ============================================================================
router.post("/", async (req, res, next) => {
  const { name, description, registerUrl, logo } = req.body;

  //! ==========================================================================
  //!   BACKEND VALIDATIONS
  //! ==========================================================================
  //? verify if user filled all mandatory information
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Add collaborator failed! Fields marked with * are mandatory! Please fill them all...",
    });
    return;
  }

  try {
    //DO if all validations were passed create the charity cause
    await CollabModel.create({ name, description, registerUrl, logo });
    res.status(201).json();
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   UPDATE COLLABORATOR SECTION
//* ============================================================================
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, registerUrl, logo, visibility } = req.body;
  try {
    await CollabModel.findByIdAndUpdate(id, { name, description, registerUrl, logo, visibility });
    res.json("Collaborator updated");
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   DELETE COLLABORATOR SECTION
//* ============================================================================
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await CollabModel.findByIdAndDelete(id);
    res.json("Collaborator deleted");
  } catch (err) {
    next(err);
  }
});

//DO export module
module.exports = router;

