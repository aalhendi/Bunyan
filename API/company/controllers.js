/* Imports */

/* Models */
const { Company } = require("../../db/models/");

/* Controllers */
exports.fetchCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    next(error);
  }
};
