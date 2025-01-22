// const jwt = require("jsonwebtoken");
const admin = require("../firebase.js");
const User = require("../models/user.model.js");
const dotenv = require("dotenv");
dotenv.config();

// const JWT_KEY = process.env.JWT_KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(400).json({ message: "No token. Access denied." });
    // console.log("token is ", token);
    const authToken = await admin.auth().verifyIdToken(token);
    if (!authToken)
      return res.status(400).json({ messaage: "Not a valid token." });

    const { uid } = authToken;
    req.user = { uid };
    // console.log("uid of user is: ", uid);
    const checkUser = await User.findOne({ uid });
    if (!checkUser)
      return res.status(404).json({ message: "User is not registered." });
    next();
  } catch (error) {
    res.status(500).json({ messaage: "Internal server error." });
  }
};

//local offline test
// const authenticate = async (req, res, next) => {
//   try {
//     next();
//   } catch (error) {
//     res.status(500).json({ messaage: "Internal server error." });
//   }
// };

module.exports = authenticate;

// const authenticate = async (req, res, next) => {
//   try {
//     const authToken = req.headers("Authorization");
//     if (!authToken)
//       return res.status(400).json({ messaage: "No token. Access denied." });
//     try {
//       const token = authToken.split(" ")[1];
//       const decodedToken = jwt.verify(token, JWT_KEY);
//       console.log(decodedToken);
//       req.user = decodedToken;
//       next();
//     } catch (error) {
//       res.status(500).json({ messaage: "Invalid token." });
//     }
//   } catch (error) {
//     res.status(500).json({ messaage: "Internal server error." });
//   }
// };
