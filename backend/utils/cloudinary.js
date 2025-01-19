// import { v2 as cloudinary } from "cloudinary";
// //this 'fs' is by default present in nodejs and helps with working with files like open, read, write,
// // remove in Sync, Asycn, Opendirectory, openpath etc.
// import fs from "fs";

const { v2: cloudinary } = require("cloudinary"); //this works as 'import coludinary as v2'
const fs = require("fs");
const dotenv = require("dotenv");
// dotenv.config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadOnCLoudinary = async (localFilePath) => {
  try {
    if (!localFilePath)
      return res.status(404).json({ message: "File not found." });
    // upload on cloudinary
    // cloudinary.uploader.upload(localFilePath, { resource_type: "auto" }, function(error, result) {console.log("result is: ",result);});
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("response url is: ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //this removes the local temporary file on server if upload fails
    return res.status(500).json({ message: error.message });
  }
};

// module.exports = { uploadOnCLoudinary };
module.exports = { uploadOnCLoudinary, cloudinary };

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
