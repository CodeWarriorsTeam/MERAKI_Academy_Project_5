//
const initialState = {
  cases: [],
  caseById: [],
};
const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CASES":
      return { ...state, cases: payload };

      case "SET_CASE":
        return { ...state.caseById, caseById: payload };

    case "ADD_CASE":
      return { ...state, cases: [...state.cases, payload] };

    case "UPDATE_CASE":
      return {
        ...state,
        cases: state.cases.map((ele) => {
          if (payload.id == ele.id) {
            return payload;
          }
          return ele;
        }),
      };

    case "DELETE_CASE":
      return {
        ...state,
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

export const AddCase = (newCase) => {
  return { type: "ADD_CASE", payload: newCase };
};

export const updateCases = (updateCase) => {
  return { type: "UPDATE_CASE", payload: updateCase };
};

export const deleteCase = (id) => {
  return { type: "DELETE_CASE", payload: id };
};

export const setCase = (caseById) => {
  return {
    type: "SET_CASE",
    payload: caseById,
  };
};