const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Import cookie-parser
dotenv.config();
const app = express();
const ideaRoute = require("./routes/idea.route.js");
const planRoute = require("./routes/plan.route.js");
const userRoute = require("./routes/user.route.js");

app.use(
  cors({
    // origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both localhost and 127.0.0.1
    origin: process.env.FRONTEND_URL,
    credentials: true, // Required for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use("/idea", ideaRoute);
app.use("/plan", planRoute);
app.use("/user", userRoute);

mongoose
  .connect(MONGO_URI, { dbName: "plan-it" })
  .then(() => {
    console.log("Database connected.");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5173", // allow the local frontend domains
//     origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // allow the local frontend domains
//     credentials: true, // allow cookies to be sent
//   })
// );
