// import multer from "multer";
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/temp"); //second parameter is about local path on where to save it locally BUT IT CAUSED ISSUES N DEPLOYED CODE so below one is used
    // Vercel sets the VERCEL environment variable to "1"
    const isVercel = process.env.VERCEL === "1";

    // Choose the appropriate directory
    const tempDir = isVercel
      ? "/tmp" // Vercel's writable directory
      : path.join(process.cwd(), "public/temp"); // local directory

    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); //second parameter is about giving unique file name
  },
});

// export const upload = multer({ storage: storage });
const upload = multer({ storage: storage });

module.exports = { upload };

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

//   const upload = multer({ storage: storage })
