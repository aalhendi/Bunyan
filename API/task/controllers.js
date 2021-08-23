/* Imports */
const Sequelize = require("sequelize");

/* Models */
const { Task, Contract, Client } = require("../../db/models/");

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

/* Fetch task by User Type */
exports.fetchTaskByUserType = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.profile.companyId) {
      res.json(await fetchTaskByType("worker", "client", user.profile.id));
    } else if (user.profile.firstName) {
      res.json(await fetchTaskByType("client", "company", user.profile.id));
    } else {
      res.json(await fetchTaskByType("company", "client", user.profile.id));
    }
  } catch (error) {
    next(error);
  }
};

/* Fetch all tasks by user type */
const fetchTaskByType = async (userType, targetUserType, profileId) => {
  try {
    const contracts = await Contract.findAll({
      where: {
        /* Find contracts that match userType */
        [`${userType}Id`]: profileId,
      },
    });
    /* Find Tasks Matching Contract */
    const tasks = await Task.findAll({
      where: {
        contractId: contracts.map((contract) => contract.id),
      },
      /* Include Target User Type from Contact Model */
      include: {
        model: Contract,
        as: "contract",
        attributes: [`${targetUserType}Id`],
      },
    });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

exports.addTask = async (req, res, next) => {
  try {
    if (!req.user.profile.name || req.user.email.endsWith("@worker.com")) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const newTask = await Task.create(req.body);
    res.json(newTask);
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
