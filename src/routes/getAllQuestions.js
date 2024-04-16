const { Question } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/questions", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Question.findAll({
        where: {
          question: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((questions) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${questions.length} résultats`;
        res.json({ message, data: questions });
      });
    }
    if (req.query.concourId) {
      const concourId = req.query.concourId;

      return Question.findAll({ where: { concourId } }).then((questions) => {
        const message = `Il y'a au total ${questions.length} questions pour le concour ${concourId}`;
        res.json({ message, data: questions });
      });
    }
    Question.findAll()
      .then((questions) => {
        const message = `La liste complète des questions a bien été reccupérée.`;

        res.json({ message, data: questions });
      })
      .catch((error) => {
        const message = `La liste complète des questions n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
