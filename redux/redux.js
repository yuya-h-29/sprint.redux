import { createStore } from "redux";
//import { reduce } from "bluebird";
const apiRoutes = require("../src/api");

// const initialState = { projects: [] };

const initialState = {
  projects: [
    {
      name: "redux",
      url: "github.com/reactjs/redux",
      buildCommand: "yarn test",
      language: "js",
    },
  ],
};

// const GET_ALL_PROJECTS = apiRoutes;

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PROJECTS":
      return { ...state };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  render();
});

function render() {
  //getstatus
}

render();

store.dispatch({ type: "GET_ALL_PROJECTS" });
