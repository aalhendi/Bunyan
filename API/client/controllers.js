/* Imports */

/* Models */
const { Client } = require("../../db/models/");

/* Controllers */
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
    // findAll()??
    // do you ever need to display a list of ALL clients in the DB?
    clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
};

exports.findClient = async (req, res, next) => {
  try {
    // this is very confusing too
    // I don't think you need this route/controller.
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
