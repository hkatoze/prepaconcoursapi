const { ValidationError } = require("sequelize");
const { Question } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/questions/", auth, (req, res) => {
    Question.create(req.body)
      .then((question) => {
        const message = `Nouvelle question ajoutée.`;

        res.json({ message, data: question });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La question n'a pas pu être crée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
