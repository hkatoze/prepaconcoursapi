const { ValidationError } = require("sequelize");
const { Concour } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/concours/", auth, (req, res) => {
    Concour.create(req.body)
      .then((concour) => {
        const message = `Le concour ${concour.name} a bien été crée.`;

        res.json({ message, data: concour });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le concour n'a pas pu être crée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
