//may not use it and delete later

module.exports = (sequelize, DataTypes) => {
  const ClientWorker = sequelize.define("ClientWorker", {
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Site is required",
        },
      },
    },
  });
  return ClientWorker;
};
