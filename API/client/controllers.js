/* Imports */
const normalize = require("normalize-path");

/* Models */
const { Test, Task, Client } = require("../../db/models/");

/* Controllers */
exports.fetchTest = async (testId, next) => {
  try {
    const test = await Test.findByPk(testId);
    return test;
  } catch (error) {
    next(error);
  }
};
//added but debatable
exports.FetchClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(clients);
  } catch (error) {
    next(error);
  }
};
exports.FetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.routeTest = async (req, res, next) => {
  try {
    test = await Test.findAll();
    res.json(test);
  } catch (error) {
    next(error);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${normalize(req.file.path)}`;
    }
    req.body.userId = req.user.id;
    const newTest = await Test.create(req.body);
    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    await req.test.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
