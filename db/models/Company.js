module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
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
    bio: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });

  return Company;
};
