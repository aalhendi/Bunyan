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

exports.updateTask = async (req, res, next) => {
  try {
    // TODO: See if worker.id !== task.workerId
    if (!req.task.workerId) {
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
