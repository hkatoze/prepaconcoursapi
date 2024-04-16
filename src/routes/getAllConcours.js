const { Concour } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/concours", auth, (req, res) => {
    Concour.findAll()
      .then((concours) => {
        const message = `La liste complète des concours a bien été reccupérée.`;

        res.json({ message, data: concours });
      })
      .catch((error) => {
        const message = `Echec de reccupération de la liste complète des concours . Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
