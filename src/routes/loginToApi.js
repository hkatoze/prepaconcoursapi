const { Admin } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/loginToApi", (req, res) => {
    Admin.findOne({ where: { emailAddress: req.body.emailAddress } })
      .then((admin) => {
        if (!admin) {
          const message = `Ce compte administrateur n'existe pas .Créer un compte ou réessayer une autre adresse email`;
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, admin.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
            //JWT
            const token = jwt.sign({ userId: admin.id }, privateKey, {
              expiresIn: "365d",
            });

            Admin.update(
              { fcmToken: req.body.fcmToken },
              { where: { id: admin.id } }
            ).then((_) => {
              const message = `Connexion administrateur réussie.`;
              return res.json({ message, data: admin, token });
            });
          });
      })
      .catch((error) => {
        const message = `L'administrateur n'a pas pu se connecter. Reessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
