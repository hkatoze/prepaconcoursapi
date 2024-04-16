const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.post("/api/login", auth, (req, res) => {
    User.findOne({
      where: {
        [Op.or]: [
          { emailAddress: req.body.emailAddress },
          { phone: req.body.phone },
        ],
      },
    })
      .then((user) => {
        if (!user) {
          const message = `Cet utilisateur n'existe pas .Créer un compte ou réessayer une autre adresse mail ou téléphone`;
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
          });
        const message = `Connexion réussie.`;
        return res.json({ message, data: user });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu se connecter. Reessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
