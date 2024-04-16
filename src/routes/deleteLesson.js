const { Lesson } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/lessons/:id", auth, (req, res) => {
    const id = req.params.id;
    Lesson.findByPk(id)
      .then((lesson) => {
        if (lesson === null) {
          const message = `Ce cours n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return lesson.destroy({ where: { id: id } }).then((_) => {
          const message = `Le cours a bien été supprimé.`;

          res.json({ message, data: lesson });
        });
      })
      .catch((error) => {
        const message = `Le cours n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
