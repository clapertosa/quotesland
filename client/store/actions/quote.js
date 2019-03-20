import * as actionType from "./actionTypes";
import axios from "../../axiosClient";

const searchInit = () => {
  return {
    type: actionType.SEARCH_INIT
  };
};

export const search = (author, quotes) => async dispatch => {
  dispatch(searchInit());
  try {
    const quote = await axios.post("/quote", { author, quotes });
    dispatch(
      searchSuccess({
        author: quote.data.result.author,
        body: quote.data.result.body
      })
    );
  } catch (error) {
    dispatch(searchFails(error));
  }
};

const searchSuccess = data => {
  return {
    type: actionType.SEARCH_SUCCESS,
    payload: data
  };
};

const searchFails = error => {
  return {
    type: actionType.SEARCH_FAILS,
    payload: error
  };
};
