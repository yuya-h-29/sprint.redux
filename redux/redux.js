import { createStore } from "redux";
// import { reduce } from "bluebird";
const router = require("router");

// const initialState = {
//   status: "running",
// };

function reducer(state = [], action) {
  switch (action.type) {
    case "Failed":
      return {
        ...state,
        slices: state.slices.slice(1),
      };

    default:
      return state;
  }
}

//store
const store = createStore(reducer);

store.subscribe(() => {
  render();
});
//action increment

//reducer

//dispatch
store.dispatch(status());

const status = () {
    
}