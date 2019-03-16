import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

export function initializeStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
