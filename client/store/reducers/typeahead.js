import * as actionType from "../actions/actionTypes";

const initialState = {
  authors: [],
  loading: false,
  success: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TYPEAHEAD_INIT:
      return { ...state, loading: true, success: false, error: null };
    case actionType.TYPEAHEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        authors: action.payload
      };
    case actionType.TYPEAHEAD_FAILS:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
