const router = require("express").Router();
const builds = require("./builds");

router.get("/", (req, res) => {
  // TODO retrieve and send all projects
  res.status(418).json({ message: "Not Implemented" });
});

router.post("/", (req, res) => {
  const { project } = req.body;
  // TODO Add new project, give it an id and send it back.
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO retrieve and send project with given id
  res.status(418).json({ message: "Not Implemented" });
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
