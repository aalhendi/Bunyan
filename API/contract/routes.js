/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer"); //remooooveee diiiss

/* Route Imports */
const {
  fetchStatuses,
  requestOnboardClient,
  fetchWaitlist,
  fetchClientsByCompany,
} = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("contractId", async (req, res, next, contractId) => {
  const contract = await fetchContract(contractId, next);
  if (contract) {
    req.contract = contract;
    next();
  } else {
    const error = new Error("Contract Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Contract Objects */
//who can fetch the statueses? all the users? company, worker and client?
// I think you need the jwt strategy here. why? lets take a look at fetchStatueses controller
router.get("/", fetchStatuses);

/* Create Contract Object */
// TODO: Auth perms
router.post("/", requestOnboardClient);

router.get(
  //TODO: Better name (?)
  "/clientsByCompany",
  passport.authenticate("jwt", { session: false }),
  fetchClientsByCompany
);

/* Fetch waitlist */
router.get(
  "/waitlist",
  // TODO: ADD AUTH PERMS
  // passport.authenticate("jwt", { session: false }),
  fetchWaitlist
);

module.exports = router;
