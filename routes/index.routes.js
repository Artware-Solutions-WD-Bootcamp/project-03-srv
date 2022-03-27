//DO require needed modules
const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

//* authorization route
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

//* charity causes route
const charityRoutes = require("./charity.routes");
router.use("/charity", charityRoutes);

//* charity elections route
const charityElectionRoutes = require("./charityElection.routes");
router.use("/charity-election", charityElectionRoutes);

//* charity movements route
const charityMovementRoutes = require("./charityMovement.routes");
router.use("/charity-movement", charityMovementRoutes);

//* collaborators causes route
const collabRoutes = require("./collab.routes");
router.use("/collab", collabRoutes);

//* user routes
const userRoutes = require("./user.routes");
router.use("/user", isAuthenticated, userRoutes);

//DO export module
module.exports = router;
