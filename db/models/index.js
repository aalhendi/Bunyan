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

db.Company.belongsToMany(db.Client, {
  through: db.CompanyClient,
  foreignKey: "companyId",
});

db.Client.belongsToMany(db.Company, {
  through: db.CompanyClient,
  foreignKey: "clientId",
});

db.Category.hasMany(db.Company, {
  foreignKey: "categoryId",
  allowNull: false,
  as: "companies",
});

db.Company.belongsTo(db.Category, {
  as: "category",
});

db.Worker.hasMany(db.Task, {
  foreignKey: "workerId",
  allowNull: false,
  as: "tasks",
});

db.Task.belongsTo(db.Worker, {
  as: "worker",
});

db.Client.hasMany(db.Task, {
  foreignKey: "clientId",
  allowNull: false,
  as: "tasks",
});

db.Task.belongsTo(db.Client, {
  as: "client",
});

//may not use the two below and delete later
db.Worker.belongsToMany(db.Client, {
  through: db.ClientWorker,
  foreignKey: "workerId",
});

db.Client.belongsToMany(db.Worker, {
  through: db.ClientWorker,
  foreignKey: "clientId",
});

module.exports = db;
