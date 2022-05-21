const express = require("express");
const { login, register } = require("../controller/auth");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "You must Enter Password").not().isEmpty(),
  ],
  login
);
router.post(
  "/register",
  [
    body("email", "Invalid Email").isEmail(),
    body("name", "You must Enter Name").not().isEmpty(),
    body("password", "You must Enter Password").not().isEmpty(),
    body("confirmPassword", "You must Enter Confirmation Password")
      .not()
      .isEmpty(),
  ],
  register
);

module.exports = router;
