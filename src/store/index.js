import rootReducer from "./reducers/index";
import Immutable from "immutable";
import thunk from "redux-thunk";

import { createBrowserHistory } from "history";

import { applyMiddleware, compose, createStore } from "redux";

import {
    connectRouter,
    routerMiddleware,
} from "connected-react-router/immutable";

const history = createBrowserHistory();
const composeEnhancers =
    true || process.env.NODE_ENV === "production"
        ? compose
        : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              serialize: {
                  immutable: Immutable,
              },
          }) || compose;

const initialState = Immutable.Map();

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);
// window.store = store;

export { history };
export default store;
