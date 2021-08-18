/* Imports */
const express = require("express");
const passport = require("passport"); // remove unused import
const { upload } = require("../../middleware/multer"); // remove unused import

/* Route Imports */
const {
  fetchTest,
  routeTest, // remove unused import
  uploadImage, // remove unused import
  deleteImage, // remove unused import
  fetchWorkers,
} = require("./controllers");

const router = express.Router();

// you clearly don't need this param route
// youre not using it anywhere
// don't just add code for no reason
// it's a bad habit that'll get you in trouble
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
/* Fetch Workers*/
router.get("/", fetchWorkers);

module.exports = router;
