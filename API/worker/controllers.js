/* Imports */

/* Models */
const { Worker } = require("../../db/models/");

/* Controllers */
exports.fetchWorker = async (workerId, next) => {
  try {
    const worker = await Worker.findByPk(workerId);
    return worker;
  } catch (error) {
    next(error);
  }
};

exports.fetchWorkers = async (req, res, next) => {
  try {
    const workers = await Worker.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(workers);
  } catch (error) {
    next(error);
  }
};
