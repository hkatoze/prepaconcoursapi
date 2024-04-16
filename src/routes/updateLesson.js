const { Lesson } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/lessons/:id", auth, (req, res) => {
    const id = req.params.id;

    Lesson.update(req.body, { where: { id: id } })
      .then((lesson) => {
        return Lesson.findByPk(id).then((lesson) => {
          if (lesson === null) {
            const message = `Le cours demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `Le cours a bien été modifié.`;

          res.json({ message, data: lesson });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le cours n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
