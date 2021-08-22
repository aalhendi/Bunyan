"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* Model Relations */

db.User.hasOne(db.Company, {
  as: "company",
  foreignKey: "userId",
});

db.Company.belongsTo(db.User, {
  as: "user",
});

db.User.hasOne(db.Client, {
  as: "client",
  foreignKey: "userId",
});

db.Client.belongsTo(db.User, {
  as: "user",
});

db.User.hasOne(db.Worker, {
  as: "worker",
  foreignKey: "userId",
});

db.Worker.belongsTo(db.User, {
  as: "user",
});

db.Company.hasMany(db.Worker, {
  foreignKey: "companyId",
  allowNull: false,
  as: "workers",
});

db.Worker.belongsTo(db.Company, {
  as: "company",
});

db.Company.hasMany(db.Contract, {
  foreignKey: "companyId",
  allowNull: false,
  as: "contracts",
});

db.Contract.belongsTo(db.Company, {
  as: "company",
});

db.Client.hasMany(db.Contract, {
  foreignKey: "clientId",
  allowNull: false,
  as: "contracts",
});

db.Contract.belongsTo(db.Client, {
  as: "client",
});

db.Worker.hasMany(db.Contract, {
  foreignKey: "workerId",
  allowNull: false,
  as: "contracts",
});

db.Contract.belongsTo(db.Worker, {
  as: "worker",
});

db.Category.hasMany(db.Company, {
  foreignKey: "categoryId",
  allowNull: false,
  as: "companies",
});

db.Company.belongsTo(db.Category, {
  as: "category",
});

db.Contract.hasMany(db.Task, {
  foreignKey: "contractId",
  allowNull: false,
  as: "tasks",
});

db.Task.belongsTo(db.Contract, {
  as: "contract",
});

module.exports = db;
