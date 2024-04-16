const { User } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/users/:userId", auth, (req, res) => {
    const id = req.params.userId;

    User.findByPk(id)
      .then((user) => {
        if (user === null) {
          const message = `Cet utilisateur n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        return user.destroy({ where: { id: id } }).then((_) => {
          const message = `L'utilisateur ${
            user.firstname + user.lastname
          } a bien été supprimé.`;
          res.json({ message, data: user });
        });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être supprimé. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
