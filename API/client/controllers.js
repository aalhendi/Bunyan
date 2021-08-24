/* Imports */ // you don't need this comment remove it but I appreciate it wallah

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
// why do you need to fetch all the clients? as a worker why do I need to fetch all the clients list? why not the only ones I'm working for?
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
