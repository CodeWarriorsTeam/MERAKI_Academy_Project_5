//
const initialState = {
  cases: [],
};
const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CASES":
return {cases: payload};
   default: return state;
  }
};

export default casesReducer;

export const setCases = (cases) => {
  return {
    type: "SET_CASES",
    payload: cases,
  };
};

