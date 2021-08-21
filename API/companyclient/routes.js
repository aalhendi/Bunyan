/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer");

/* Route Imports */
const {
  fetchStatuses,
  requestOnboardClient,
  fetchWaitlist,
} = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("companyclientId", async (req, res, next, companyclientId) => {
  const companyclient = await fetchCompanyclient(companyclientId, next);
  if (companyclient) {
    req.companyclient = companyclient;
    next();
  } else {
    const error = new Error("Companyclient Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Companyclient Objects */
router.get("/", fetchStatuses);

/* Create Companyclient Object */
// TODO: Auth perms
router.post("/", requestOnboardClient);

/* Fetch waitlist */
router.get(
  "/waitlist",
  // TODO: ADD AUTH PERMS
  // passport.authenticate("jwt", { session: false }),
  fetchWaitlist
);

module.exports = router;
