//DO require needed modules
const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

//* authorization route
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

//* charity causes route
const charityCauseRoutes = require("./cause.routes")
router.use("/causes", charityCauseRoutes)

//* collaborators causes route
const collabRoutes = require("./collab.routes")
router.use("/collabs", collabRoutes)

//* user routes
const userRoutes = require("./user.routes")
router.use("/users", isAuthenticated, userRoutes)

//DO export module
module.exports = router;
