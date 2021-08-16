module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username is already in-use",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Usename is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone Number is required",
        },
        len: {
          args: [7, 8],
          msg: "Number must be either 7 or 8 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "E-mail is required",
        },
        isEmail: {
          args: true,
          msg: "Must be a valid email",
        },
      },
    },
  });

  return User;
};
