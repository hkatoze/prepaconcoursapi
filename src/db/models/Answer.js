module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Answer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "'answer' est une propriété requise",
          },
          notNull: {
            msg: "'answer' est une propriété requise",
          },
        },
      },
      isGood: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "'isGood' est une propriété requise",
          },
          notNull: {
            msg: "'isGood' est une propriété requise",
          },
        },
      },
    },
    { timestamp: true }
  );
};
