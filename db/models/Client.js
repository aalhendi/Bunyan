module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "First Name is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Last Name is required",
        },
      },
    },
  });

  return Client;
};
