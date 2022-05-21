const express = require("express");
const {
  getAllVeterans,
  getAllOrganizations,
  pendingInvites,
  acceptInvite,
} = require("../controller/user");
const isAuth = require("../middleware/auth");
const router = express.Router();

router.get("/veterans", isAuth, getAllVeterans);
router.get("/invites", isAuth, pendingInvites);
router.patch("/accept", isAuth, acceptInvite);

module.exports = router;
