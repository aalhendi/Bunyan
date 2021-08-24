/* Imports */
const jwt_decode = require("jwt-decode");
const Sequelize = require("sequelize");

/* Models */
const { Contract, Client, User, Company } = require("../../db/models");

/* Controllers */
//why fetch all the statuses? why not only the ones related to the company or clinet or worker?
// so if you will fetch the related statuses you need the jwt strategy thingy
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

      // you know I'm gonna comment on this! seriously for loop😭
      // you better use one of the iteration methods! and yes you can use index in the iteration methods. How? google it🤓
      //but i don't think you need the index thing here!!!!
      //Anyways you can leave it like this for now😭
      const clientList = [];
      for (let i = 0; i < waitlist.length; i++) {
        const client = await Client.findOne({
          where: {
            id: waitlist[i].clientId,
          },
        });
        clientList.push(client);
      }
      // i hate this i hate it 7aram 3lekum👆🏻😭

      res.json(clientList);
      // remove this comment if you are not gonna use it👇🏻
      // res.json({
      //   id: foundClient.id,
      //   firstName: foundClient.firstName,
      //   lastName: foundClient.lastName,
      //   status: status.status,
      // });
      //👆🏻
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
    // why Promise.all ?
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
        // if you had more than one thing in the req.body(status and something else) you shouldn't do this you should use the spread operator(Saleh best friend👬🏻) keep that in mind!
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
