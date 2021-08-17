/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer");

/* Route Imports */
const { fetchCompanies } = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("testId", async (req, res, next, testId) => {
  const test = await fetchTest(testId, next);
  if (test) {
    req.test = test;
    next();
  } else {
    const error = new Error("Test Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Test Objects */
router.get("/", fetchCompanies);

module.exports = router;
