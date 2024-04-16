const { Answer } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/answers/:id", auth, (req, res) => {
    const id = req.params.id;
    Answer.findByPk(id)
      .then((answer) => {
        if (answer === null) {
          const message = `Cette reponse n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return answer.destroy({ where: { id: id } }).then((_) => {
          const message = `La reponse a bien été supprimée.`;

          res.json({ message, data: answer });
        });
      })
      .catch((error) => {
        const message = `La reponse n'a pas pu être supprimée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
