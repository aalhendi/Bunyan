/* Imports */

/* Models */
const { Client, Task } = require("../../db/models/");

/* Controllers */
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
    
exports.fetchClient = async (clientId, next) => {
  try {
    const client = await Client.findByPk(clientId);
    return client;
    } catch (error) {
    next(error);
  }
};
    
exports.fetchClients = async (req, res, next) => {
  try {
    clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

exports.findClient = async (req, res, next) => {
  try {
    res.json(req.client);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id !== req.client.userId) {
      const error = new Error("Unauthorized.");
      error.status = 401;
      next(error);
    }
    await req.client.update(req.body);
    res.json(req.client);
  } catch (error) {
    next(error);
  }
};
