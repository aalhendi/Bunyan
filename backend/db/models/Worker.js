module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define("Worker", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required",
        },
      },
    },
  });

  return Worker;
};
