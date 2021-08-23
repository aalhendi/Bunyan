/* Imports */
const jwt_decode = require("jwt-decode");
const Sequelize = require("sequelize");

/* Models */
const { Contract, Client, User, Company } = require("../../db/models");

/* Controllers */
exports.fetchStatuses = async (req, res, next) => {
  try {
    const statuses = await Contract.findAll();
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
      const waitlist = await Contract.findAll({
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

exports.fetchClientsByCompany = async (req, res, next) => {
  try {
    const { user } = req
    const contracts = await Contract.findAll({
      where: {
        /* Find contracts that match companyId */
        companyId: user.profile.id,
      },
      attributes: [
        /* Only find distinct (unique) clientIds */
        [Sequelize.fn("DISTINCT", Sequelize.col("clientId")), "clientId"],
        "status",
        // Question: How can I include all other columns without listing them all?
      ],
    });

    /* Find clients that match clientIds */
    const clientList = await Promise.all(
      contracts.map(async (contract) => {
        const client = await Client.findByPk(contract.clientId);
        /* Add status to the client object from the contract */
        client.dataValues.status = contract.status;
        return client;
      })
    );

    res.json(clientList);
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
        const foundContract = await Contract.findOne({
          where: {
            companyId: req.body.companyId,
            clientId: foundClient.id,
          },
        });
        if (foundContract) {
          const error = new Error("Contract Relationship already exists");
          // TODO: Set err status ?
          next(error);
          // TODO: FIX  VALIDATION ERROR IF RELATIONSHIP EXISTS ?
        }

        const status = await Contract.create({
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
