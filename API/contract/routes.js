/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer");

/* Route Imports */
const {
  fetchStatuses,
  fetchContract,
  requestOnboardClient,
  fetchWaitlist,
  fetchClientsByCompany,
  updateContract
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

router.put(
  "/:contractId",
  passport.authenticate("jwt", { session: false }),
  updateContract
);
module.exports = router;
