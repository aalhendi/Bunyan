/* Imports */
const jwt_decode = require("jwt-decode");

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
    /* Decode bearer token to get profile object*/
    const user = jwt_decode(req.headers["authorization"].split(" ")[1]);

    // TODO: Check if this is even needed
    if (user.id !== req.user.id) {
      const error = new Error("User mismatch");
      error.status = 500;
      next(error);
    }

    /* Find contracts that match companyId */
    const contracts = await Contract.findAll({
      where: {
        companyId: user.profile.id,
      },
    });

    /* get unique clientIds from contracts */
    const contractClientIds = [
      ...new Set(contracts.map((contract) => contract.clientId)),
    ];
    const clientList = [];

    /* Find clients that match clientIds */
    for (let i = 0; i < contractClientIds.length; i++) {
      const client = await Client.findOne({
        where: {
          id: contractClientIds[i],
        },
      });
      /* Add client to clientList with status from contracts */
      client.dataValues.status = contracts.find(
        (contract) => contract.clientId === client.id
      ).status;
      clientList.push(client);
    }

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
