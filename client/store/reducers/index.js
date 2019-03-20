import { combineReducers } from "redux";
import typeaheadReducer from "./typeahead";
import quoteReducer from "./quote";
import authorReducer from "./author";

const rootReducer = combineReducers({
  typeahead: typeaheadReducer,
  quote: quoteReducer,
  author: authorReducer
});

export default rootReducer;
