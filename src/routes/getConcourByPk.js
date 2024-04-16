const { Concour } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/concours/:id", auth, (req, res) => {
    const id = req.params.id;
    Concour.findByPk(id)
      .then((concour) => {
        if (concour === null) {
          const message = `Le concour demandé n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `Le ${concour.name} a bien été reccupéré.`;

        res.json({ message, data: concour });
      })
      .catch((error) => {
        const message = `Le concour n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
