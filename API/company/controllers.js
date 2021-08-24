/* Imports */ //re`move this

/* Models */
const { Company } = require("../../db/models/");

exports.fetchCompany = async (companyId, next) => {
  try {
    const company = await Company.findByPk(companyId);
    return company;
  } catch (error) {
    next(error);
  }
};

exports.findCompany = async (req, res, next) => {
  try {
    res.json(req.company);
  } catch (error) {
    next(error);
  }
};

/* Controllers */
// 👆🏻 remove this comment or you can put it before the findCompany controller
exports.fetchCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    next(error);
  }
};

/* Update Compnay Profile */
exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id !== req.company.userId) {
      const error = new Error("Unauthorized.");
      error.status = 401;
      next(error);
    }
    await req.company.update(req.body);
    res.json(req.company);
  } catch (error) {
    next(error);
  }
};
