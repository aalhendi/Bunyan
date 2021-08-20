/* Imports */

/* Models */
const { CompanyClient, Client, User } = require("../../db/models/");

/* Controllers */
exports.fetchStatuses = async (req, res, next) => {
  try {
    const statuses = await CompanyClient.findAll();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
};

exports.requestOnboardClient = async (req, res, next) => {
  try {
    // GET DATA from req.body
    // console.log("Req", req.body);
    const foundUser = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    // console.log("user", foundUser);
    if (foundUser) {
      const foundClient = await Client.findOne({
        where: {
          userId: foundUser.id,
        },
      });
      // console.log("client", foundClient);
      if (foundClient) {
        const foundCompanyClient = await CompanyClient.findOne({
          where: {
            companyId: req.body.companyId,
            clientId: foundClient.id,
          },
        });
        // console.log("companyClient", foundCompanyClient);
        if (foundCompanyClient) {
          const error = new Error("CompanyClient Relationship already exists");
          // TODO: Set err status ?
          next(error);
          // TODO: FIX ERROR ?
        }

        const status = await CompanyClient.create({
          clientId: foundClient.id,
          companyId: req.body.companyId,
          status: req.body.status,
        });
        res.json(status);
      } else {
        const error = new Error("Client not found");
        error.status = 404;
        next(error);
      }
    } else {
      const error = new Error("User not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
