import { createStore } from "redux";
import { reduce } from "bluebird";

const initialState = {
  slices: ["A", "A", "A"],
  topping: ["B", "B", "B"],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "EAT_SLICE":
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
