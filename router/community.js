const express = require("express");
const {
  createProfile,
  getAllCommunities,
  getUserCommunities,
  followCommunity,
} = require("../controller/community");
const isAuth = require("../middleware/auth");
const { body, param } = require("express-validator");
const router = express.Router();

router.post(
  "/create",
  [
    body("name", "You must enter name").not().isEmpty(),
    body("type", "You must enter type").not().isEmpty(),
  ],
  isAuth,
  createProfile
);
router.get("/", isAuth, getAllCommunities);
router.get("/user", isAuth, getUserCommunities);
router.patch(
  "/:id",
  [param("id", "You must enter id").not().isEmpty()],
  isAuth,
  followCommunity
);

module.exports = router;
