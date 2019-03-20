import * as actionType from "../actions/actionTypes";

const initialState = {
  data: {
    image: undefined,
    signatureImage: undefined,
    signature: undefined,
    extract: undefined,
    pageUrl: undefined
  },
  loading: false,
  success: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTHOR_INIT:
      return {
        ...state,
        data: {
          image: undefined,
          signatureImage: undefined,
          extract: undefined,
          pageUrl: undefined
        },
        loading: true,
        success: false,
        error: null
      };
    case actionType.AUTHOR_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
        error: null
      };
    case actionType.AUTHOR_FAILS:
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
