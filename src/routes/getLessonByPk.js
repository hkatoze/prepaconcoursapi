const { Lesson } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/lessons/:id", auth, (req, res) => {
    const id = req.params.id;
    Lesson.findByPk(id)
      .then((lesson) => {
        if (lesson === null) {
          const message = `Le cours demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `Le cours a bien été reccupéré.`;

        res.json({ message, data: lesson });
      })
      .catch((error) => {
        const message = `Le cours n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
