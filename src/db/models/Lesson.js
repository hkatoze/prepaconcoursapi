module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Lesson",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      concourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      pdfLink: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamp: true, updatedAt: false }
  );
};
