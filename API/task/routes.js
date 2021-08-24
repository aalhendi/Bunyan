/* Imports */
const express = require("express");
const passport = require("passport");
const { upload } = require("../../middleware/multer");

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

//fetch all the tasks?
/* Fetch Task*/
router.get("/", fetchTasks);

// who can add a new task? and it is okay to add task if the user it not logged in?
router.post("/", addTask);

/* Update Task status  */
router.put(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTask
);

module.exports = router;
