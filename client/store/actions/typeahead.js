import * as actionType from "./actionTypes";
import axios from "../../axiosClient";

const typeaheadInit = () => {
  return {
    type: actionType.TYPEAHEAD_INIT
  };
};

export const typeahead = () => async dispatch => {
  dispatch(typeaheadInit());
  try {
    const authors = await axios.post("/typeahead");
    dispatch(typeaheadSuccess(authors.data.results));
  } catch (error) {
    dispatch(typeaheadFails(error));
  }
};

const typeaheadSuccess = authors => {
  return {
    type: actionType.TYPEAHEAD_SUCCESS,
    payload: authors
  };
};

const typeaheadFails = error => {
  return {
    type: actionType.TYPEAHEAD_FAILS,
    payload: error
  };
};
