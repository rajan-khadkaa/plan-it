const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/", planController.getAllPlans);
router.get("/:id", planController.getSinglePlan);
router.post("/", authenticate, planController.addPlan);
router.put("/:id", planController.updatePlan);
router.delete("/:id", planController.deletePlan);

module.exports = router;
