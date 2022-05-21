const User = require("../model/user");
const Event = require("../model/event");
exports.inviteVeteran = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        msg: ["No event found"],
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: ["No user found with the given email"],
      });
    }

    user.pendingInvites.push(event._id);

    await user.save();

    return res.status(200).json({
      msg: ["Invitation Sent"],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
