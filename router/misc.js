const express = require("express");
const { inviteVeteran } = require("../controller/misc");
const isAuth = require("../middleware/auth");
const { body } = require("express-validator");
const router = express.Router();

router.post("/invite/:id", isAuth, inviteVeteran);

module.exports = router;
