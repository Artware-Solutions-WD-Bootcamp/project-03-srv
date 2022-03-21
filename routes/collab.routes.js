//DO require needed modules
const router = require("express").Router();
const CollabModel = require("../models/Collab.model");


//* ============================================================================
//*   GET ALL COLLABORATORS SECTION
//* ============================================================================
router.get("/", async (req, res, next) => {

  try {
    const response = await CollabModel.find().select("name description url registerUrl logo visibility");
    // console.log("collab.routes.js base response: ", response)
    res.json(response);
  } catch (err) {
    next(err);
  }
});


//* ============================================================================
//*   ADD NEW COLLABORATOR SECTION
//* ============================================================================


//* ============================================================================
//*   COLLABORATOR DETAILS SECTION
//* ============================================================================


//* ============================================================================
//*   UPDATE COLLABORATOR SECTION
//* ============================================================================


//* ============================================================================
//*   DELETE COLLABORATOR SECTION
//* ============================================================================

//DO export module
module.exports = router;

