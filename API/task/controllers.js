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
    if (req.user.id === req.task.userId) {
      await req.task.update(req.body);
      res.json(req.task);
    } else {
      await req.task.update({ status: req.body.status });
      console.log(req.task);
      res.json(req.task);
    }
  } catch (error) {
    next(error);
  }
};
