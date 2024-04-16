const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../../index.html");

    fs.readFile(filePath, "utf8", (err, htmlContent) => {
      if (err) {
        // En cas d'erreur de lecture du fichier
        res.status(500).send("Erreur de lecture du fichier HTML.");
      } else {
        // Envoi du contenu HTML en réponse
        res.send(htmlContent);
      }
    });
  });
};
