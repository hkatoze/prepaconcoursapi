const { Concour } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/concours", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Concour.findAll({
        where: {
          name: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((concours) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${concours.length} résultats`;
        res.json({ message, data: concours });
      });
    }
    Concour.findAll()
      .then((concours) => {
        const message = `La liste complète des concours a bien été reccupérée.`;

        res.json({ message, data: concours });
      })
      .catch((error) => {
        const message = `La liste complète des concours n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
