module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define("Contract", {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required",
        },
      },
    },
  });
  return Contract;
};
