/* Imports */

/* Models */
const { Task } = require("../../db/models/");

/* Controllers */
exports.fetchTask = async (taskId, next) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (error) {
    next(error);
  }
};
// who would fetch all the tasks?
//fetch the tasks related to worker, ... much better
exports.fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// hmmmm checkout my comment in the routes! something is missing (who will add the new task?)
exports.addTask = async (req, res, next) => {
  try {
    if (req.body.workerId && req.body.clientId) {
      const newTask = await Task.create(req.body);
      res.json(newTask);
    } else {
      const error = new Error("Worker or Client should not be Empty.");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
/* Modify task and update the status value */
exports.updateTask = async (req, res, next) => {
  try {
    if (
      req.user.id !==
      (req.task.userId || req.task.clientId || req.task.workerId)
    ) {
      const error = new Error("Unauthorized.");
      error.status = 401;
      next(error);
    }
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    await req.task.update(req.body);
    res.json(req.task);
  } catch (error) {
    next(error);
  }
};
