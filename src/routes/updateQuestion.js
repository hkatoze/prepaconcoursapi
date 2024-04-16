const { Question } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/questions/:id", auth, (req, res) => {
    const id = req.params.id;

    Question.update(req.body, { where: { id: id } })
      .then((question) => {
        return Question.findByPk(id).then((question) => {
          if (question === null) {
            const message = `La question demandée n'existe pas. Réessayer avec un autre identifiant.`;

            return res.status(404).json({ message });
          }
          const message = `La question a bien été modifié.`;

          res.json({ message, data: question });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La question n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
