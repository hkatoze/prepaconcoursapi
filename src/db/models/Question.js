module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      concourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "'question' est une propriété requise",
          },
          notNull: {
            msg: "'question' est une propriété requise",
          },
        },
      },
    },
    { timestamp: true }
  );
};
