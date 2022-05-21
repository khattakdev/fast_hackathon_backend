const User = require("../model/user");
const Event = require("../model/event");

exports.getAllVeterans = async (req, res) => {
  try {
    const veterans = await User.find();

    res.status(200).json({
      msg: ["List of Veterans"],
      veterans,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.pendingInvites = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const events = await Event.find({
      _id: { $in: user.pendingInvites },
    });

    res.status(200).json({
      msg: ["List of all the pending invites"],
      events,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.acceptInvite = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user);

    const isEventInPending = user.pendingInvites.find(
      (invite) => invite._id == id
    );

    if (!isEventInPending) {
      return res.json(404).json({
        error: ["No event found"],
      });
    }

    const isEventAlreadyAccepted = user.interested.find(
      (invite) => invite._id == id
    );

    if (isEventAlreadyAccepted) {
      return res.json(200).json({
        error: ["Event already accepted"],
      });
    }

    user.pendingInvites = user.pendingInvites.filter(
      (invite) => invite._id != id
    );
    user.interested.push(id);

    res.status(200).json({
      msg: ["List of all the pending invites"],
      events,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
