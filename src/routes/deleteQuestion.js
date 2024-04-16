const { Question } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/questions/:id", auth, (req, res) => {
    const id = req.params.id;
    Question.findByPk(id)
      .then((question) => {
        if (question === null) {
          const message = `Cette question n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return question.destroy({ where: { id: id } }).then((_) => {
          const message = `La question a bien été supprimée.`;

          res.json({ message, data: question });
        });
      })
      .catch((error) => {
        const message = `La question n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
