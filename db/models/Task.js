module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
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
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
  });

  return Task;
};
