/* Imports */
const express = require("express");
const passport = require("passport");
const router = express.Router();

/* Controller Imports */
const { register, login, getClientByUserId } = require("./controllers");

/* Create user */
router.post("/register", register);

/* Login */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get("/clientByUserId/", getClientByUserId);

module.exports = router;
