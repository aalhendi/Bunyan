/* Imports */

/* Models */
const { Task } = require("../../db/models/");

/* Controllers */
exports.fetchTask = async (task, next) => {
  try {
    // Test?
    const task = await Test.findByPk(taskId);
    return task;
  } catch (error) {
    next(error);
  }
};

exports.fetchTasks = async (req, res, next) => {
  try {
    // findAll?
    // are you showing ALL tasks in the DB?
    const tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
