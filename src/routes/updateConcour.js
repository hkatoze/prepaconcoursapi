const { Concour } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/concours/:id", auth, (req, res) => {
    const id = req.params.id;

    Concour.update(req.body, { where: { id: id } })
      .then((concour) => {
        return Concour.findByPk(id).then((concour) => {
          if (concour === null) {
            const message = `Le concour demandé n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `Le concour ${concour.name} a bien été modifié.`;

          res.json({ message, data: concour });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `Le concour n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
