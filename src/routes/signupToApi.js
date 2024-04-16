const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const { Admin } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/signupToApi", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create admin account
      const admin = await Admin.create({
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });

      const message = `Compte administrateur crée avec succès!`;
      res.json({ message, data: admin });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message });
      }
      const errorMessage = `L'utilisateur n'a pas pu être créé. Réessayer dans quelques instants.`;
      res.status(500).json({ message: errorMessage, data: error });
    }
  });
};
