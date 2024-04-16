const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const favicon = require("serve-favicon");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app
  .use(bodyParser.json())
  .use(cors())
  .use(favicon(__dirname + "/favicon.ico"));
initDb();

/* ........All routes list........... */
require("./src/routes/home")(app);
require("./src/routes/resetPassword")(app);
require("./src/routes/resetPasswordCodeVerify")(app);
require("./src/routes/getUserByPk")(app);
require("./src/routes/updateUser")(app);
require("./src/routes/getAllUsers")(app);
require("./src/routes/createUser")(app);
require("./src/routes/signupToApi")(app);
require("./src/routes/loginToApi")(app);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;