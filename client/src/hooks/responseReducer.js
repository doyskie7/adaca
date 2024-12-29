const SET_RESPONSE = "response/set";
const CLEAR_RESPONSE = "response/clear";

export const setResponse = (response) => ({
  type: SET_RESPONSE,
  payload: response,
});

export const clearResponse = () => ({
  type: CLEAR_RESPONSE,
});

const initialState = {
  item: {
    reload:false
  },
};

const responseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSE:
      return {
        ...state,
        item: action.payload,
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        item: {}, 
      };
    default:
      return state;
  }
};

export default responseReducer;
