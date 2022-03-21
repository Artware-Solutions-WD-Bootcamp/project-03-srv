//DO import needed mocules
const jwt = require("express-jwt")

// function to check if user is authenticated with a valid Token and generate the payload
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if (req?.headers?.authorization?.split(" ")[0] === "Bearer") {
      const authToken = req.headers.authorization.split(" ")[1]
      console.log("Token sent")
      return authToken
    } else {
      console.log("No Token")
      return null
    }
  }
})

//DO export module
module.exports = isAuthenticated