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
    default:
      return state;
return {cases: payload};
  case "ADD_CASE":
return {cases:[...state.cases,payload]};


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

export const updateCases = (updateCase) => {
  return { type: "UPDATE_CASES", payload: updateCase };
};
export const AddCase = (newCase)=>{
return {type:"ADD_CASE" , payload:newCase};
}

