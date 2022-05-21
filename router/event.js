const express = require("express");
const {
  listEvents,
  createEvent,
  showInterest,
} = require("../controller/event");
const isAuth = require("../middleware/auth");
const { body, param } = require("express-validator");
const router = express.Router();

router.get("/", isAuth, listEvents);
router.post(
  "/create",
  [
    body("title", "You must Enter Title").not().isEmpty(),
    body("description", "You must Enter description").not().isEmpty(),
    body("date", "You must Enter Date").not().isEmpty(),
    body("city", "You must Enter City").not().isEmpty(),
    body("points", "You must Enter Points").not().isEmpty(),
  ],
  createEvent
);

router.patch(
  "/interest/:id",
  isAuth,
  [param("id", "You must enter ID").not().isEmpty()],
  showInterest
);
module.exports = router;
