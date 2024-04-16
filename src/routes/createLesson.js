const { ValidationError } = require("sequelize");
const { Lesson } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/lessons/", auth, (req, res) => {
    Lesson.create(req.body)
      .then((lesson) => {
        const message = `Nouveau cours ajoutée.`;

        res.json({ message, data: lesson });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le cours n'a pas pu être crée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
