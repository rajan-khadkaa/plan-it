const Plan = require("../models/plan.model.js");

exports.getAllPlans = async (req, res) => {
  try {
    const planData = await Plan.find();
    if (!planData)
      return res.status(400).json({ message: "No plan records found." });
    res.status(200).json(planData);
    // console.log("plan data being sent are: ", planData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSinglePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const singlePlan = await Plan.findOne({ _id: id });
    if (!singlePlan)
      return res.status(404).json({ message: "Plan data not found." });
    return res.status(200).json(singlePlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPlan = async (req, res) => {
  try {
    const planData = req.body;
    const { uid } = req.user;
    const allData = { ...planData, uid: uid };
    const insertPlan = await Plan.create(allData);
    console.log("all plan data: ", insertPlan);
    if (!insertPlan)
      return res.status(400).json({ message: "Could not add plan record." });
    res.status(200).json(insertPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    //here new true in the below code returns the newly updated data instead of previous old data.
    const updateData = await Plan.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    // const updateData = await Plan.findOneAndUpdate({ _id: id }, data);
    if (!updateData)
      return res.status(400).json({ message: "Plan record not found." });
    return res.status(200).json(updateData);
  } catch (error) {}
};

exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlan = await Plan.findOneAndDelete({ _id: id });
    if (!deletePlan)
      return res.status(404).json({ message: "Plan record not found." });
    return res
      .status(200)
      .json({ message: "Plan record deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
