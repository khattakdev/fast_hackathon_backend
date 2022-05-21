const express = require("express");
const {
  getAllVeterans,
  getAllOrganizations,
  pendingInvites,
} = require("../controller/user");
const isAuth = require("../middleware/auth");
const router = express.Router();

router.get("/veterans", isAuth, getAllVeterans);
router.get("/organizations", isAuth, getAllOrganizations);
router.get("/invites", isAuth, pendingInvites);
router.patch("/accept", isAuth, pendingInvites);

module.exports = router;
