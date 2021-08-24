/* Imports */
const express = require("express");

/* Route Imports */
const { fetchWorkers } = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("workerId", async (req, res, next, workerId) => {
  const worker = await fetchWorker(workerId, next);
  if (worker) {
    req.worker = worker;
    next();
  } else {
    const error = new Error("Worker Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Workers*/
//who would fetch all the workers?🤔
router.get("/", fetchWorkers);

module.exports = router;
