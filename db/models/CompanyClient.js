module.exports = (sequelize, DataTypes) => {
  const CompanyClient = sequelize.define("CompanyClient", {
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
  return CompanyClient;
};
