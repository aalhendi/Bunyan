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
    // maybe you should add here, maybe at the bottom of the file,
    // the different statuses and what each of them means.
    status: { type: DataTypes.INTEGER },
  });

  return Task;
};
