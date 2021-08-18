/* Imports */
const express = require("express");

/* Route Imports */
const { fetchTasks } = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("taskId", async (req, res, next, taskId) => {
  const task = await fetchTask(taskId, next);
  if (task) {
    req.task = task;
    next();
  } else {
    const error = new Error("Task Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Task*/
router.get("/", fetchTasks);

module.exports = router;
