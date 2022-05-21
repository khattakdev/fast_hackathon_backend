const User = require("../model/user");
const Event = require("../model/event");
const { validationResult } = require("express-validator");

exports.listEvents = async (req, res) => {
  console.log(req.user);
  try {
    const events = await Event.find();

    if (events.length == 0) {
      return res.status(404).json({
        error: ["No events found"],
      });
    }

    res.status(200).json({
      msg: ["Events found"],
      events,
    });
  } catch (error) {
    res.status(500).json({
      error: ["Server Error, Please Try Again Later"],
    });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date, city, type, points } = req.body;

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
    const event = new Event({
      title,
      description,
      date,
      city,
      type,
      points,
    });
    await event.save();

    return res.status(200).json({
      msg: ["Event created successfully"],
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ["Server Error, Please Try Again Later"],
    });
  }
};

exports.showInterest = async (req, res) => {
  const { id } = req.params;

  console.log(id);

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
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error: ["No event found!"],
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(400).json({
        errpr: ["Please login again and retry"],
      });
    }

    const isInterestShown = event.interested.find((ev) => ev == req.user);
    if (isInterestShown)
      return res.status({
        msg: ["Already shown interest"],
      });
    event.interested.push(req.user);

    user.interested.push(event._id);

    await event.save();
    await user.save();

    return res.status(200).json({
      msg: ["Interested in the event!"],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ["Server Error, Please Try Again Later"],
    });
  }
};
