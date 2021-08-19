/* Imports */
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_MS = process.env.JWT_EXPIRATION_MS;

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
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      exp: Date.now() + JWT_EXPIRATION_MS,
      profile: await createUserProfile(userType, newUser, req.body),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.email.endsWith("@worker.com")) {
      var profile = await Worker.findOne({
        where: {
          userId: user.id,
        },
      });
      console.log("Worker: ", profile?.dataValues);
    } else {
      var profile = await Client.findOne({
        where: {
          userId: user.id,
        },
      });
      console.log("Client: ", profile?.dataValues);
      if (!profile?.dataValues) {
        profile = await Company.findOne({
          where: {
            userId: user.id,
          },
        });
        console.log("Company: ", profile?.dataValues);
      }
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      exp: Date.now() + JWT_EXPIRATION_MS,
      profile: profile.dataValues,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

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

const validateUserType = (userType) => {
  if (
    userType !== "company" &&
    userType !== "client" &&
    userType !== "worker"
  ) {
    throw new Error("Invalid userType");
  }
};

const createUserProfile = async (userType, newUser, reqBody) => {
  try {
    switch (userType) {
      case "company":
        return await Company.create({
          userId: newUser.id,
          name: newUser.username,
          companyId: newUser.companyId,
        });
      case "client":
        return await Client.create({
          userId: newUser.id,
          firstName: "firstName",
          lastName: "lastName",
        });
      case "worker":
        return await Worker.create({
          userId: newUser.id,
          name: newUser.username,
          companyId: reqBody.companyId,
        });
      default:
        throw new Error("Invalid userType");
    }
  } catch (err) {
    console.log(err);
  }
};
