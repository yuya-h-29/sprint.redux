/* eslint-disable import/no-extraneous-dependencies, no-console, no-unused-expressions */
const fetch = require("node-fetch");
const Promise = require("bluebird");
const chai = require("chai");
const chaiExclude = require("chai-exclude");

chai.use(chaiExclude);

const { expect, assert } = chai;
chai.should();

const endPoint = "http://localhost:1337/api";
const projEndPoint = `${endPoint}/projects`;

let insertedProjects;

const projUrl = (id) => `${projEndPoint}/${insertedProjects[id].id}`;
const projBuilds = (id) => `${projUrl(id)}/builds`;
const buildUrl = (projId, buildId) => `${projUrl(projId)}/builds/${buildId}`;
const req = (url, options) =>
  fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

const initialProjects = [
  {
    name: "redux",
    url: "github.com/reactjs/redux",
    buildCommand: "yarn test",
    language: "js",
  },
  {
    name: "Noodles",
    url: "google.com",
    buildCommand: "go start",
    language: "bash",
  },
  {
    name: "node-fetch",
    url: "github.com/node-fetch/redux",
    buildCommand: "yarn test:all",
    language: "TypeScript",
  },
];

const testWelcome = async () => {
  console.info("GET /api");
  const response = await req(endPoint);
  expect(response.status).to.equal(200);
};

const getJson = async (url, options) => {
  const response = await req(url, options);
  return response.json();
};

const testInsert = async () => {
  console.info("GET /api/projects");
  expect(await getJson(projEndPoint)).to.eql({ projects: [] });
  console.info("POST /api/projects");
  // Note that normally you would map the promises and use Promise.All, but for testing purposes we need the order
  // You should never await in a for loop, as that is basically forcing sync execution.
  insertedProjects = [];
  for (let i = 0; i < initialProjects.length; i++) {
    const project = initialProjects[i];
    const insertedProject = await getJson(projEndPoint, {
      method: "POST",
      body: JSON.stringify(project),
    });
    insertedProjects.push(insertedProject);
  }

  const expected = { projects: [...initialProjects] };
  const projects = await getJson(projEndPoint);
  for (let i = 0; i < projects.projects.length; i += 1) {
    const project = projects.projects[i];
    expect(project)
      .excluding("id")
      .to.deep.equal(expected.projects[i]);
  }
};

const testInitialProjects = async () => {
  console.info("GET /api/projects/:projectId");
  const projects = await Promise.all(
    initialProjects.map((proj, index) => getJson(projUrl(index)))
  );
  for (let i = 0; i < projects.length; i += 1) {
    const project = projects[i];
    expect(project)
      .excluding("id")
      .to.eql(initialProjects[i]);
  }
};

const testDelete = async () => {
  console.info("DELETE /api/projects/:projectId");
  await fetch(projUrl(1), { method: "DELETE" });
  const { projects } = await getJson(projEndPoint);
  projects.length.should.equal(2);
  projects[1].id.should.equal(insertedProjects[2].id);
};

const testPatch = async () => {
  console.info("PATCH /api/projects/:projectId");
  await req(projUrl(2), {
    method: "PATCH",
    body: JSON.stringify({
      buildCommand: "yarn test",
      language: "JavaScript",
    }),
  });
  const project = await getJson(projUrl(2));
  project.buildCommand.should.equal("yarn test");
  project.language.should.equal("JavaScript");
};

const testBuilds = async () => {
  console.info("GET /api/projects/:projectId/builds");
  const emptyBuilds = await getJson(projBuilds(2));
  emptyBuilds.builds.length.should.equal(0);

  console.info("POST /api/projects/:projectId/builds");
  await req(projBuilds(2), { method: "POST" });
  const pendingBuildTests = await getJson(projBuilds(2));
  pendingBuildTests.builds.length.should.equal(1);
  pendingBuildTests.builds[0].state.should.equal("Pending");

  await Promise.delay(4000);
  console.info("GET /api/projects/:projectId/builds/:buildNumber");
  const runningBuild = await getJson(buildUrl(2, 0));
  runningBuild.state.should.equal("Running");

  await Promise.delay(4000);
  const finishedBuild = await getJson(buildUrl(2, 0));
  const { state } = finishedBuild;
  assert(["Success", "Failed"].includes(state));
  finishedBuild.output.should.not.be.empty;

  await Promise.all([
    req(projBuilds(2), { method: "POST" }),
    req(projBuilds(2), { method: "POST" }),
    req(projBuilds(2), { method: "POST" }),
    req(projBuilds(2), { method: "POST" }),
    req(projBuilds(2), { method: "POST" }),
  ]);

  console.info("GET /api/projects/:projectId/builds");
  const { builds } = await getJson(projBuilds(2));
  builds.length.should.equal(6);

  console.info("GET /api/projects/:projectId/builds/latest");
  const { buildNumber } = await getJson(`${projBuilds(2)}/latest`);
  buildNumber.should.equal(5);
};

const simulate = async () => {
  await Promise.delay(1000); // just making sure server is started
  await testWelcome();
  await testInsert();
  await testInitialProjects();
  await testDelete();
  await testPatch();
  await testBuilds();
};

simulate()
  .then(() => {
    console.log("Simulation successfully passed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
