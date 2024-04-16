module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("<center>Api Prepa Concours Lab déployé avec succès😊</center>");
  });
};
