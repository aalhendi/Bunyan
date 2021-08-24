/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer"); //remove this you are not using it

/* Route Imports */
const {
  fetchCompanies,
  updateProfile,
  fetchCompany,
  findCompany,
} = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("companyId", async (req, res, next, companyId) => {
  const company = await fetchCompany(companyId, next);
  if (company) {
    req.company = company;
    next();
  } else {
    const error = new Error("Company Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Company Objects */
router.get("/", fetchCompanies);

router.get("/:companyId", findCompany);

/* Update Router */
router.put(
  "/:companyId",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
module.exports = router;
