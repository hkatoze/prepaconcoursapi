const { Answer } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/answers/:id", auth, (req, res) => {
    const id = req.params.id;
    Answer.findByPk(id)
      .then((answer) => {
        if (answer === null) {
          const message = `La reponse demandée n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `La reponse a bien été reccupérée.`;

        res.json({ message, data: answer });
      })
      .catch((error) => {
        const message = `La reponse n'a pas pu être reccupérée. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
