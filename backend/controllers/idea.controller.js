const express = require("express");
const Idea = require("../models/idea.model.js");
const { uploadOnCLoudinary, cloudinary } = require("../utils/cloudinary.js");
const fs = require("fs");

exports.getAllIdeas = async (req, res) => {
  try {
    const { uid } = req.user;
    const ideaData = await Idea.find({ uid }).sort({ createdAt: -1 });
    // console.log("ideas sent to frontend: ", ideaData);
    if (!ideaData || ideaData.length === 0)
      return res.status(400).json({ message: "No idea records found." });
    res.status(200).json(ideaData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user; //this is firebase decoded uid from authenticate.js middleware
    const singleIdea = await Idea.findOne({ _id: id, uid: uid });
    if (!singleIdea)
      return res.status(404).json({ message: "Idea data not found." });
    return res.status(200).json(singleIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addIdea = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { uid } = req.user;

    const parsedTags = JSON.parse(tags);
    let imageUrl = null;
    if (req.file) {
      const localFilePath = req.file.path;
      const uploadResult = await uploadOnCLoudinary(localFilePath);
      // console.log("image upload returns: ", uploadResult);
      // console.log("uploaded file info is: ", uploadResult);
      imageUrl = uploadResult.url; //the url of the image is returned by cloudinary
      imgPublicId = uploadResult.public_id; //this is the public id that is stored in db so later used to delete the image from cloudinary.
      // console.log("url of image is: ", imageUrl);
      // console.log(" Image public key is: ", imgPublicId);

      //after upload delete the image file
      fs.unlinkSync(localFilePath);
    }
    // const allData = { ...ideaData, uid: uid };
    const allData = {
      title,
      content,
      tags: parsedTags,
      image: imageUrl,
      imgPublicId,
      uid,
    };
    const insertIdea = await Idea.create(allData);
    if (!insertIdea)
      return res.status(400).json({ message: "Could not add idea record." });
    res.status(200).json(insertIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.addIdea = async (req, res) => {
//   try {
//     const ideaData = req.body;
//     const { uid } = req.user;
//     // console.log("received uid from authenticate middleware: ", uid);
//     // console.log("user sent data are: ", ideaData);
//     const allData = { ...ideaData, uid: uid };
//     const insertIdea = await Idea.create(allData);
//     if (!insertIdea)
//       return res.status(400).json({ message: "Could not add idea record." });
//     res.status(200).json(insertIdea);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("idea id received is: ", id);

    const { title, content, tags } = req.body;
    // console.log("idea body received are: ", title, content, tags);
    //here new true in the below code returns the newly updated data instead of previous old data.
    const updateData = await Idea.findOneAndUpdate(
      { _id: id },
      { title, content, tags },
      {
        new: true,
      }
    );
    // const updateData = await Idea.findOneAndUpdate({ _id: id }, data);
    if (!updateData)
      return res.status(400).json({ message: "Idea record not found." });
    return res.status(200).json(updateData);
  } catch (error) {}
};

exports.deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    // const checkImg = await Idea.findOne({ _id: id });
    // if (!checkImg)
    //   return res.status(404).json({ message: "Idea record not found." });

    // if (checkImg.image) {
    // }

    //LOOK AT THIS TO DELETE THE IMAGE FROM CLOUDINARY
    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found." });
    }

    // Delete the image from Cloudinary
    if (idea.image) {
      const publicId = idea.imgPublicId;
      await cloudinary.uploader.destroy(publicId); // this deletes the image from the cloudinary as well.
    }

    // // Delete the idea document from the database
    // await Idea.findByIdAndDelete(id);

    const deleteIdea = await Idea.findOneAndDelete({ _id: id });
    if (!deleteIdea)
      return res.status(400).json({ message: "Could not delete the idea." });
    return res
      .status(200)
      .json({ message: "Idea record deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
