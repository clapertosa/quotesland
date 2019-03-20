import * as actionType from "../actions/actionTypes";

const initialState = {
  data: {
    author: undefined,
    body: undefined
  },
  loading: false,
  success: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEARCH_INIT:
      return {
        ...state,
        data: {
          ...state.data
        },
        loading: true,
        success: false,
        error: null
      };
    case actionType.SEARCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
        error: null
      };
    case actionType.SEARCH_FAILS:
      return {
        ...state,
        data: { ...state.data },
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
