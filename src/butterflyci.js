const apiRoutes = require("./api");

const express = require("express");
const bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use("/api", apiRoutes);
server.use((err, req, res) => {
  res.status(500).send(err.message);
});

const port = process.env.PORT || 3000;
server.listen(port);
