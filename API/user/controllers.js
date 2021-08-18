/* Imports */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

/* Models */
const { User, Company, Client, Worker } = require("../../db/models");

/* Controllers */
exports.register = async (req, res, next) => {
  const { userType } = req.body;
  delete req.body.userType;

  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    validateUserType(userType);
    const newUser = await User.create(req.body);
    // TODO: merge validateUserType() and createUserProfile() functions (?)
    createUserProfile(userType, newUser, req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    console.log(payload);
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
//added email to payload cuz its needed
exports.login = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// i think we discussed this already
// but i think there're ways to avoid this route/controller
exports.getClientByUserId = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      const error = new Error("Missing userId");
      error.status = 400;
      next(error);
    }
    const client = await Client.findOne({
      where: {
        userId: userId,
      },
    });
    res.json(client.dataValues);
  } catch (error) {
    next(error);
  }
};

// clearly this doesn't do anything.
const validateUserType = (userType) => {
  switch (userType) {
    case "company":
      break;
    case "client":
      break;
    case "worker":
      break;
    default:
      throw new Error("Invalid userType");
  }
};

const createUserProfile = async (userType, newUser, reqBody) => {
  try {
    switch (userType) {
      // maybe use reqBody in all these .create()s and leave it for the FE to make sure the body of
      // the request has all the data needed for that type of user.
      case "company":
        await Company.create({
          userId: newUser.id,
          name: newUser.username,
          companyId: newUser.companyId, // does a company have a companyId?
        });
        break;
      case "client":
        await Client.create({
          userId: newUser.id,
          firstName: "firstName",
          lastName: "lastName",
        });
        break;
      case "worker":
        await Worker.create({
          userId: newUser.id,
          name: newUser.username,
          companyId: reqBody.companyId,
        });
        break;
      default:
        throw new Error("Invalid userType");
    }
  } catch (err) {
    console.log(err);
  }
};

// I commend whoever wrote all this code for thinking independently.
// while some of this needs correcting, it's natural when carving your own path.
