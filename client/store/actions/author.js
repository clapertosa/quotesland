import * as actionType from "./actionTypes";
import axios from "../../axiosClient";
import wikiConversion from "../../utils/wikiQuery";

const authorInit = () => {
  return {
    type: actionType.AUTHOR_INIT
  };
};

export const getAuthor = name => async dispatch => {
  dispatch(authorInit());
  try {
    const query = await axios.post("/author", { name });
    const data = wikiConversion(query.data, name);
    dispatch(authorSuccess(data));
  } catch (error) {
    dispatch(authorFails(error));
  }
};

const authorSuccess = data => {
  return {
    type: actionType.AUTHOR_SUCCESS,
    payload: data
  };
};

const authorFails = error => {
  return {
    type: actionType.AUTHOR_FAILS,
    payload: error
  };
};
