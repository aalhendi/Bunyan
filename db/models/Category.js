module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
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
    image: { type: DataTypes.STRING },
  });

  return Category;
};
