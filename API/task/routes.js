/* Imports */
const express = require("express");
const passport = require("passport");

/* Route Imports */
const { fetchTasks, addTask, updateTask, fetchTask } = require("./controllers");

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
router.post("/", addTask);
/* Update Task status  */
router.put(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  updateTask
);

module.exports = router;
