const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const { User } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/signup", auth, (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({
        emailAddress: req.body.emailAddress,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        password: hash,
      })
        .then((user) => {
          const message = `L'utilisateur ${
            user.firstname + " " + user.lastname
          } a bien été crée`;

          res.json({ message, data: user });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
          }
          if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message });
          }

          console.log(error);
          const message = `L'utilisateur n'a pas pu être crée. Réessayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
