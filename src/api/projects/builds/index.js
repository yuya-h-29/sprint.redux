const router = require("express").Router({ mergeParams: true });

// const buildProject = require(.)

//Idk but I'm goona add this anyway
const shortid = require("shortid");
const projectId = shortid.generate();
console.log("SSSSS", projectId);

router.get("/", (req, res) => {
  const { projectId } = req.params;
  console.log("AAAAAAAA");
  console.log("AAAAAA", { projectId });
  // TODO Get and return all builds of given project

  res.status(418).json({ message: "Not Implemented" });
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  // TODO Trigger a new build for a project. Return immediately with status 200 (don't wait for build to finish).
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  // TODO Retrieve the latest build of a project
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
