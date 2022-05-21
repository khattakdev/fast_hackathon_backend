const Community = require("../model/community");
const Event = require("../model/event");
const User = require("../model/user");
const { validationResult } = require("express-validator");

exports.createProfile = async (req, res) => {
  const { name, type } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => {
      return error.msg;
    });
    return res.status(422).json({
      error: errorArray,
    });
  }

  try {
    const community = await Community.find({
      name,
    });

    if (community.length != 0) {
      return res.status(409).json({
        msg: ["Community with such name already exist"],
      });
    }

    const newCommunity = new Community({
      name,
      type,
      created_by: req.user,
    });

    await newCommunity.save();

    res.status(200).json({
      msg: ["Community Created!"],
      community: newCommunity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ["Server Error, Please Try Again Later"],
    });
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const organizations = await Community.find();

    res.status(200).json({
      msg: ["List of all Communities"],
      organizations,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.getUserCommunities = async (req, res) => {
  try {
    const communities = await Community.find({
      created_by: req.user,
    });

    res.status(200).json({
      msg: ["List of your communities"],
      communities,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.followCommunity = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => {
      return error.msg;
    });
    return res.status(422).json({
      error: errorArray,
    });
  }

  try {
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({
        error: ["No community found"],
      });
    }

    const user = await User.findById(req.user);

    user.follow.push(community._id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
