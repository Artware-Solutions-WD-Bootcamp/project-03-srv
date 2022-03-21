//DO require needed modules
const router = require("express").Router();
const CharityCauseModel = require("../models/CharityCause.model");


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
//*   ADD NEW CHARITY CAUSE SECTION
//* ============================================================================


//* ============================================================================
//*   CHARITY CAUSE DETAILS SECTION
//* ============================================================================


//* ============================================================================
//*   UPDATE CHARITY CAUSE SECTION
//* ============================================================================


//* ============================================================================
//*   DELETE CHARITY CAUSE SECTION
//* ============================================================================

//DO export module
module.exports = router;

