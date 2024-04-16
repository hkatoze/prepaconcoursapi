const { ValidationError } = require("sequelize");
const { Answer } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/answers/", auth, (req, res) => {
    Answer.create(req.body)
      .then((answer) => {
        const message = `Nouvelle reponse ajoutée.`;

        res.json({ message, data: answer });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La reponse n'a pas pu être crée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
