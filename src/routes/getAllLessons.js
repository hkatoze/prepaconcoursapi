const { Lesson } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/lessons", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Lesson.findAll({
        where: {
          title: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((lessons) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${lessons.length} résultats`;
        res.json({ message, data: lessons });
      });
    }

    if (req.query.concourId) {
      const concourId = req.query.concourId;

      return Lesson.findAll({ where: { concourId } }).then((lessons) => {
        const message = `Il y'a au total ${lessons.length} cours pour le concour ${concourId}`;
        res.json({ message, data: lessons });
      });
    }
    Lesson.findAll()
      .then((lessons) => {
        const message = `La liste complète des cours a bien été reccupérée.`;

        res.json({ message, data: lessons });
      })
      .catch((error) => {
        const message = `La liste complète des cours n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
