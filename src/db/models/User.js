module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: true,

        unique: {
          msg: "L'adresse mail est déjà utilisé.",
        },
        validate: {
          isEmail: {
            msg: "L'adresse mail n'est pas valide",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },

      resetPasswordCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamp: true }
  );
};
