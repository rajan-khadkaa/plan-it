const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const admin = require("../firebase.js");
const crypto = require("crypto"); // For Gravatar

exports.addUser = async (req, res) => {
  try {
    // const token = req.headers.authorization;
    // console.log("token is: ", token);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(400)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // console.log("token is: ", token);
    if (!token)
      return res
        .status(400)
        .json({ message: "Unauthorized: No token provided" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, name, email, picture } = decodedToken;

    // console.log(
    //   `uid is ${uid} name is ${name}, email is ${email}, picture is ${picture}`
    // );

    // Use fullName from request body (for Email/Password Sign-Up) or fall back to decodedToken.name (for Google Sign-In)
    //and if both are not available then give empty
    const userName = req.body.fullName || name || "";

    // A custom profile image URL since email/password has no picture but since the google signin has so it uses 'picture' (e.g., for Email/Password users)
    const avatarUrl =
      picture ||
      `https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg` ||
      `https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=`;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      const addUser = await User.create({
        uid,
        name: userName,
        email,
        picture: avatarUrl,
      });
      if (!addUser)
        return res
          .status(400)
          .json({ message: "Could not add user. Try again." });
    }

    res.cookie("token", token, {
      httpOnly: true, // Temporarily false for testing
      // secure: false,
      // sameSite: "lax",
      secure: true, // Ensures cookies are only sent over HTTPS
      sameSite: "none", // Allows cross-origin cookies
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // Optional: Sets expiry (e.g., 30 days)
    });
    // console.log("Setting cookie: ", token);

    return res
      .status(200)
      .json({ success: true, message: "Login Successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.userProtectedRoutes = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log("cookie/token from frontend protected route: ", token);
    if (!token)
      return res.status(200).json({
        success: false,
        message: "No token provided. Signup or Login to continue.",
      });

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken)
      return res.status(400).json({ mesage: "Invalid token." });
    const { email } = decodedToken;
    // console.log("email in protected route is: ", email);
    const checkUser = await User.findOne({ email });
    // console.log("user in db in protected route is: ", checkUser);
    if (checkUser) return res.status(200).json({ success: true });

    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//local offline test
// exports.userProtectedRoutes = async (req, res) => {
//   try {
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // secure: false,
      // sameSite: "lax",
      secure: true, // Ensures cookies are only sent over HTTPS
      sameSite: "none", // Allows cross-origin cookies
      path: "/",
    });
    res.status(200).json({ message: "User logged out." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileInfo = async (req, res) => {
  try {
    const { uid } = req.user;
    const findUser = await User.findOne({ uid });
    if (!findUser) return res.status(404).json({ message: "User not found." });

    const userData = {
      name: findUser.name,
      email: findUser.email,
      picture: findUser.picture,
    };

    return res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // console.log("user received: ", userData);
//     const searchEmail = User.findOne({ email }).lean();
//     if (searchEmail.email === email)
//       return res.status(400).json({ message: "Email is already registered." });
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("hashed password is: ", hashedPassword);
//     const addUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     console.log("User inserted is: ", addUser);
//     if (!addUser)
//       return res.status(400).json({ message: "Could not add user data." });
//     res.status(200).json(addUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.verifyUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = await User.findOne({ email });

//     if (!findUser) {
//       return res
//         .status(404)
//         .json({ message: "Not registered. Register first." });
//     }
//     const checkPW = bcrypt.compare(password, findUser.password); //this might return boolean value
//     console.log(checkPW);

//     if (checkPW) {
//       console.log("user can access system.");
//       return res.status(200).json({ message: "You can access system." });
//     } else {
//       return res.status(400).json({ message: "Incorrect password." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
