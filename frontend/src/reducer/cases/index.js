//
const initialState = {
  cases: [],
};
const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CASES":
      return { cases: payload };
    case "UPDATE_CASES":
      return {
        cases: state.cases.map((ele) => {
          if (payload.id == ele.id) {
            return payload;
          }
          return ele;
        }),
      };

    case "ADD_CASE":
      return { cases: [...state.cases, payload] };

      case "DELETE_CASE":
        return {...state,
          cases: state.cases.filter((cases) => {
            return cases.id != payload;
          }),
        };

    default:
      return state;
  }
};

export default casesReducer;

export const setCases = (cases) => {
  return {
    type: "SET_CASES",
    payload: cases,
  };
};

export const updateCases = (updateCase) => {
  return { type: "UPDATE_CASES", payload: updateCase };
};
export const AddCase = (newCase) => {
  return { type: "ADD_CASE", payload: newCase };
};



export const deleteCase = (id) => {
  return { type: "DELETE_CASE", payload: id };
};
