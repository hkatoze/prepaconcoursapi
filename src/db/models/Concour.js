module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Concour",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom du concour est une propriété requise",
          },
          notNull: {
            msg: "Le nom du concour est une propriété requise",
          },
        },
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
