const { Answer } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/answers/:id", auth, (req, res) => {
    const id = req.params.id;

    Answer.update(req.body, { where: { id: id } })
      .then((answer) => {
        return Answer.findByPk(id).then((answer) => {
          if (answer === null) {
            const message = `La reponse demandée n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `La reponse a bien été modifié.`;

          res.json({ message, data: answer });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La reponse n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
