const express = require("express");
const projects = require("./projects");

const routes = express.Router();

routes.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to ButterflyCI!" })
);
routes.use("/projects", projects);

module.exports = routes;
