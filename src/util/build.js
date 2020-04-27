const Promise = require("bluebird");
const Queue = require("queue");

const queue = Queue();
queue.autostart = true;
queue.concurrency = 1;

const buildProject = async (projectId, buildNumber) => {
  await Promise.delay(3000); // Please leave this in to simulate load

  // TODO Set build status to "Running" in app state!

  // super complex build logic following, check out project, run yarn test etc etc
  await Promise.delay(3000); // Do not modify this timing
  const buildStatus = Math.random() > 0.5 ? "Failed" : "Success";
  const output = "Donezo!";

  // TODO Set build status and output in app state!
};

const triggerBuild = async (projectId) => {
  // TODO add this new build to application state!
  // You also have to get the new build number assigned to it here.
  const buildNumber = -1; // Needs to be gotten from state!
  queue.push(() => buildProject(projectId, buildNumber));
};

module.exports = {
  triggerBuild,
};
