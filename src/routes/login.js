const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/login", auth, (req, res) => {
    if (req.body.emailAddress) {
      return User.findOne({
        where: { emailAddress: req.body.emailAddress },
      }).then((user) => {
        if (!user) {
          const message = `Cet utilisateur n'existe pas .Créer un compte ou réessayer une autre adresse email`;
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
      });
    } else {
      return User.findOne({ where: { phone: req.body.phone } }).then((user) => {
        if (!user) {
          const message = `Cet utilisateur n'existe pas .Créer un compte ou réessayer une autre numéro de téléphone`;
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
      });
    }
  });
};
