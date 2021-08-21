/* Imports */

/* Models */
const { CompanyClient, Client, User, Company } = require("../../db/models/");

/* Controllers */
exports.fetchStatuses = async (req, res, next) => {
  try {
    const statuses = await CompanyClient.findAll();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
};

exports.fetchWaitlist = async (req, res, next) => {
  try {
    const foundCompany = await Company.findOne({
      where: {
        id: req.query.companyId,
      },
    });
    if (foundCompany) {
      const waitlist = await CompanyClient.findAll({
        where: {
          status: 0,
          companyId: foundCompany.id,
        },
      });

      const clientList = [];
      for (let i = 0; i < waitlist.length; i++) {
        const client = await Client.findOne({
          where: {
            id: waitlist[i].clientId,
          },
        });
        clientList.push(client);
      }

      res.json(clientList);
      // res.json({
      //   id: foundClient.id,
      //   firstName: foundClient.firstName,
      //   lastName: foundClient.lastName,
      //   status: status.status,
      // });
    } else {
      const error = new Error("Company not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.requestOnboardClient = async (req, res, next) => {
  try {
    // GET DATA from req.body
    const foundUser = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (foundUser) {
      const foundClient = await Client.findOne({
        where: {
          userId: foundUser.id,
        },
      });
      if (foundClient) {
        const foundCompanyClient = await CompanyClient.findOne({
          where: {
            companyId: req.body.companyId,
            clientId: foundClient.id,
          },
        });
        if (foundCompanyClient) {
          const error = new Error("CompanyClient Relationship already exists");
          // TODO: Set err status ?
          next(error);
          // TODO: FIX  VALIDATION ERROR IF RELATIONSHIP EXISTS ?
        }

        const status = await CompanyClient.create({
          clientId: foundClient.id,
          companyId: req.body.companyId,
          status: req.body.status,
        });

        // TODO: Format this nicely (?)
        res.json({
          id: foundClient.id,
          firstName: foundClient.firstName,
          lastName: foundClient.lastName,
          status: status.status,
        });
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
