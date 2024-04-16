const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("./models/User");
const ConcourModel = require("./models/Concour");
const AdminModel = require("./models/Admin");

const sequelize = new Sequelize(
  "u833159023_prepaconcours",
  "u833159023_haroun",
  "Kind@1404",
  {
    host: "vbs-solutions.com",
    dialect: "mysql",
    dialectOptions: {},
    logging: false,
  }
);

const User = UserModel(sequelize, DataTypes);
const Admin = AdminModel(sequelize, DataTypes);
const Concour = ConcourModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log(`La base de données a bien été initialisée !`);
  });
};

module.exports = { initDb, User, Admin, Concour };
