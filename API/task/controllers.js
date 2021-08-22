/* Imports */

/* Models */
const { Task } = require("../../db/models/");

/* Controllers */
exports.fetchTask = async (task, next) => {
  try {
    const task = await Test.findByPk(taskId);
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
