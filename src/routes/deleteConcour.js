const { Concour } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/concours/:id", auth, (req, res) => {
    const id = req.params.id;
    Concour.findByPk(id)
      .then((concour) => {
        if (concour === null) {
          const message = `Ce concour n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return concour.destroy({ where: { id: id } }).then((_) => {
          const message = `Le concour ${concour.name} a bien été supprimé.`;

          res.json({ message, data: concour });
        });
      })
      .catch((error) => {
        const message = `Ce concour n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
