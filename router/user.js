const express = require("express");
const {
  getAllVeterans,
  pendingInvites,
  acceptInvite,
  followVetOrCommunity,
} = require("../controller/user");
const isAuth = require("../middleware/auth");
const router = express.Router();

router.get("/veterans", isAuth, getAllVeterans);
router.get("/invites", isAuth, pendingInvites);
router.patch("/accept", isAuth, acceptInvite);
router.patch("/follow/:id", isAuth, followVetOrCommunity);

module.exports = router;
