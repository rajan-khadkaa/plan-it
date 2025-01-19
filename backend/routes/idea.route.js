const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/idea.controller.js");
const authenticate = require("../middleware/authenticate.js");
const { upload } = require("../middleware/multer.middleware.js");

router.get("/", authenticate, ideaController.getAllIdeas);
router.get("/:id", authenticate, ideaController.getSingleIdea);
router.post("/", authenticate, upload.single("image"), ideaController.addIdea);
router.put("/:id", authenticate, ideaController.updateIdea);
router.delete("/:id", authenticate, ideaController.deleteIdea);

module.exports = router;
