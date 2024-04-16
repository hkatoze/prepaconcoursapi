const { User } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/users", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return User.findAll({
        where: {
          firstname: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((users) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${users.length} résultats`;
        res.json({ message, data: users });
      });
    }
    User.findAll()
      .then((users) => {
        const message = `La liste complète des utilisateurs a bien été reccupérée.`;

        res.json({ message, data: users });
      })
      .catch((error) => {
        const message = `La liste complète des utilisateurs n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
