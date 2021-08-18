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
    createUserProfile(userType, newUser);
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

const createUserProfile = async (userType, newUser) => {
  switch (userType) {
    case "company":
      await Company.create({
        userId: newUser.id,
        name: newUser.username,
        companyId: newUser.companyId,
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
        companyId: newUser.companyId,
      });
      break;
    default:
      throw new Error("Invalid userType");
  }
};
