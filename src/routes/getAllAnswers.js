const { Answer } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/answers", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Answer.findAll({
        where: {
          answer: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((answers) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${answers.length} résultats`;
        res.json({ message, data: answers });
      });
    }

    if (req.query.questionId) {
      const questionId = req.query.questionId;

      return Answer.findAll({ where: { questionId } }).then((answers) => {
        const message = `Il y'a au total ${answers.length} reponses pour la question ${questionId}`;
        res.json({ message, data: answers });
      });
    }
    if (req.query.concourId) {
      const concourId = req.query.concourId;

      return Answer.findAll({ where: { concourId } }).then((answers) => {
        const message = `Il y'a au total ${answers.length} reponses pour la question ${concourId}`;
        res.json({ message, data: answers });
      });
    }
    Answer.findAll()
      .then((answers) => {
        const message = `La liste complète des reponses a bien été reccupérée.`;

        res.json({ message, data: answers });
      })
      .catch((error) => {
        const message = `La liste complète des reponses n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
